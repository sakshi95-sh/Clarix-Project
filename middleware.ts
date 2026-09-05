import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import {SignJWT,jwtVerify} from 'jose'

export async function  middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
 
  const headers = new Headers(request.headers);
  console.log("1 ------ IAM MIDDLEWARE")
   console.log("---------");
  console.log("HEADER -------", headers)
   console.log("---------");
  console.log("TOKEN -------", token)
  
  if (token) {
    try {
      // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      //   userId: string;
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jose.jwtVerify(token, secret);
      const userId = (payload as {
        userId: string
      }).userId;
        console.log("----------PAYLOAD-------------",payload);

      headers.set("x-user-id", userId);
      console.log("HEY, IAM MIDDLEWARE", userId)
      console.log("HEADER -------", headers)
      // console.log("HEADER CONTENTS:", Object.fromEntries(headers.entries()));
    }
     catch(error) {
      console.log("Invalid token");
        console.log("REAL ERROR:", error);

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
