import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bycript from "bcryptjs";

await connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { token,newPassword } = data;
        const hashedPassword = await bycript.hash(newPassword, 10);
        console.log("POST /api/users/newPass called with token:", token);
        const user = await User.findOne({
            forgotPasswordToken: token,
        });
        if(!user) {
            return NextResponse.json({
                message: "Invalid or expired token",
                status: 400
            });
        }
        if(Date.now() > user.forgotPasswordExpiry) {
            return NextResponse.json({
                message: "Token has expired",
                status: 400
            });
        }
        user.password = hashedPassword; // Assuming password is hashed in the User model
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Password updated successfully",
            status: 200
        });
        
    } catch (error) {

        console.error("Error in POST /api/users/newPass:", error);
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500       
        });
    }
}