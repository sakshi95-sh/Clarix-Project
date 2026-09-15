export const dynamic = "force-dynamic";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;
  if (!email?.trim() || !password?.trim()) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email Address" },
        { status: 404 },
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 },
      );
    }

    const secretValue = process.env.JWT_SECRET;

    if (!secretValue) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const secret = new TextEncoder().encode(secretValue);


    //Using Jose

    const token = await new jose.SignJWT({ userID: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
    .sign(secret)


    // console.log("Token:", token);
    const response = NextResponse.json(
      {
        email,
        userID: user.id,
        username: user.username
      },
      { status: 200, statusText: "Login successful" },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
