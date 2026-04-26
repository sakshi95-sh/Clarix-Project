

import { prisma } from "@/app/lib/prisma";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {


    const body = await request.json();
    const { username, name, email, password } = body;

if(!email) {
    return Response.json(
        { 
        message: "Email is required" 
        },
        { status: 400 }
    );
}
if(!password) {
    return Response.json(
        { 
        message: "Password is required" 
        },
        { status: 400 }
    );
}
if(!username) {
    return Response.json(
        { 
        message: "Username is required" 
        },
        { status: 400 }
    );
}
if(!email.includes("@")) {
    return Response.json({ 
        message: "Invalid email" 
        },
        { status: 400 
    });
}

if(password.length < 6) {
    return Response.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
    );
}

if(username.length < 3) {
    return Response.json(
       {message: "Username must be at least 3 characters long" },
     { status: 400 }
    );
}

try{

const existingUser = await prisma.user.findUnique({ where: { username } });
if(existingUser) {
    return Response.json(
        { message: "Username already exists" },
        { status: 400 }
    );
}

const existingEmail = await prisma.user.findUnique({ where: { email } });
if(existingEmail) {
    return Response.json(
        { message: "Email already exists" },
        { status: 400 }
    );
}

const saltRounds=10;

const hashedPassword = await bcryptjs.hash(password, saltRounds);



    await prisma.user.create({
        data: {
            username,
            name,
            email,
            password:hashedPassword
        }
    });


    return Response.json({ 
        Data: {
          "Username": username,
          "Name": name,
          "Email": email,
        },
        message: "Signup successful" 
    });
}
catch(error){
    console.error("Signup Error:", error);
    return Response.json(
        { message: "Internal server error" },
        { status: 500 }
    );
}
}