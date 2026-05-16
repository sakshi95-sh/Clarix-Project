export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/lib/auth";

export async function GET() {

   try {
      await verifyAuth();
      return NextResponse.json({
         authenticated: true
      });

   } catch {
      return NextResponse.json({
         authenticated: false
      });
   }
}