import { prisma } from "../lib/prisma";

export async function test() {
    try{
        const result = await prisma.user.findFirst()
        console.log("✅ DB Connected:", result);
    } catch (error) {
        console.error("❌ DB Error:", error);
    }
}

test();