import {connectToDatabase} from "@/dbConfig/dbConfig";
import {NextResponse, NextRequest} from "next/server";
import {User} from "@/models/userModel";


connectToDatabase();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const {token} = data;
        console.log("Token received:", token);
        if (!token) {
            return NextResponse.json({error: "Token is required"}, {status: 400});

        }
        else{
            const user = await User.findOne({verifyToken: token});
            console.log("user recieved is :" , user);
            if(!user) {
                return NextResponse.json({error: "Invalid token"}, {status: 400});
            }
            if(user.verifyTokenExpiry < Date.now()) {
                return NextResponse.json({error: "Token has expired"}, {status: 400});
            }   
            user.isVarified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            await user.save();
            return NextResponse.json({
                message: "User verified successfully",
                status: 200,
                user
            });
            
        }
    } catch (error) {
        throw new Error(`Error in POST /api/users/verify: ${error}`);
    }
}
