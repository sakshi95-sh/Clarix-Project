
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password } = body;
    if( !email?.trim() || !password?.trim()) {
        return NextResponse.json(
            { message: 'Email and password are required' },
             { status: 400 });
    }

    try {
    const user = await prisma.user.findUnique({
        where: {    
            email,
        },
    });
    if (!user) {
        return NextResponse.json(
            { message: 'Invalid email or password' },
             { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json(
            { message: 'Invalid password' },
             { status: 401 });
    }
    return NextResponse.json(
        { 
            email,
            userId: user.id,
            username: user.username
        },
        { status: 200, statusText: 'Login successful' }
    );
} catch (error) {
    return NextResponse.json(
        { message: 'Internal server error' },
         { status: 500 });
}
}