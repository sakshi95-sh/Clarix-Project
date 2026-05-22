import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const headers = new Headers(request.headers);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };

      headers.set("x-user-id", decoded.userId);
    } catch {
      console.log("Invalid token");
    }
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
    "/api/audio",
    "/api/image",
    "/api/upload",
    "/api/chats",
  ],
};
