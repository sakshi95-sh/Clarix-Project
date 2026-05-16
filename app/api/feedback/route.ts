import { verifyAuth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {

  try {
     
   
    const body = await request.json();
    

    const {
      email,
      type,
      message,
      rating
    } = body;

    const feedback = await prisma.feedback.create({
      data: {
        email,
        type,
        message,
        rating
      }
    });

    return Response.json({
      success: true,
      feedback
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error: "Failed to submit feedback"
      },
      {
        status: 500
      }
    );
  }
}