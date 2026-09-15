import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";


export async function  middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
 
  const headers = new Headers(request.headers); 
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
      const secretValue = process.env.JWT_SECRET;
    if (!secretValue) {
      throw new Error("JWT_SECRET environment variable is not set");
    }
    const secret = new TextEncoder().encode(secretValue);
      const { payload } = await jose.jwtVerify(token, secret);
      const userID = (payload as {
        userID: string
      }).userID;
      headers.set("x-user-id", userID);

    }
     catch(error) {
     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: [
    "/api/message",
    "/api/messages",
    "/api/audio",
    "/api/image",
    "/api/upload",
    "/api/chats",
  ],
};
