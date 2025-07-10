import {connectToDatabase} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import {User} from "@/models/userModel";
import bcrypt from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";
import { send } from "process";


export async function POST(request : NextRequest)
{
    await connectToDatabase();
    try {
        const body = await request.json();
        const {email, password, username} = body;
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        // Send verification email
        const emailResponse = await sendEmail({
            email: newUser.email,
            emailType: "verify",
            userID: newUser._id
        });
        if (!emailResponse) {
            return NextResponse.json({
                message: "Failed to send verification email",
                status: 500
            });
        }   
        return NextResponse.json({
            message: "User created successfully", 
            status: 201,
            newUser,
        });

    } catch (error) {
        console.error("Error in POST /api/users/signup:", error);
        return NextResponse.json({
        message: "Internal Server Error",
        status: 500       
    });
        
    }
}