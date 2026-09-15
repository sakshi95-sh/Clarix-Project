import * as jose from "jose";
import { cookies } from "next/headers";

export async function verifyAuth() {
  const cookieStore = await cookies();  
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }
  const secretValue = process.env.JWT_SECRET;
  if (!secretValue) {
  throw new Error("JWT_SECRET environment variable is not set");
  }
  try {
    const secret = new TextEncoder().encode(secretValue)
    const { payload } = await jose.jwtVerify(token, secret);
    console.log("payload", payload)
  
    return (payload as { userId: string }).userId;
  }
  catch {
    throw new Error("Unauthorized");
  }
}
