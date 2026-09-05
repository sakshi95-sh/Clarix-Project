import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAuth() {
  const cookieStore = await cookies();
  console.log("1 ------ IAM AUTH")

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };
  console.log("DECODE VALUE",decoded);
  return decoded;
}
