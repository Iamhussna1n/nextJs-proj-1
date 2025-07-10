import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connectToDatabase();
export async function GET()
{
    try {
        const response = NextResponse.json({
            message: "User logged out successfully",
            status: 200
        });
        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0) 
        });
        return response;
        
    } catch (error : any) {
        console.log("Error in GET /api/users/logout:", error.message);
        return NextResponse.json({
            message: "Internal Server Error",
            status: 500,
        });
    }
}