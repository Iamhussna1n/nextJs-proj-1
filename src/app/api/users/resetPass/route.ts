import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/userModel";
import {sendEmail} from "@/helpers/mailer";



await connectToDatabase();


export async function POST(request: NextRequest)
{
    console.log("POST /api/users/resetPass called!!!!!!!");
    try {
        const body = await request.json();
        const {email} = body;
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        const response = await sendEmail({
            email: user.email,
            emailType: "reset",
            userID: user._id
        })
        if (!response) {
            return NextResponse.json({
                message: "Failed to send reset email",
                status: 500
            });
        }   
        return NextResponse.json({
            message: "Reset email sent successfully",
            status: 200,
        });
        
    } catch (error : any) {
        
        console.error("Error in POST /api/users/resetPass:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500       
        });
    }
}