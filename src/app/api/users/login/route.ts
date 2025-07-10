import { connectToDatabase } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid credentials",
            },
            { status: 401 }
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
            success: false,
            message: "Invalid credentials",
        },
        { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      status: 200,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d"},);
    response.cookies.set("token",token,
      {httpOnly: true},
    );
    return response;

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
        {
            success: false,
            message: "Internal server error",
        },
        { status: 500 }
        );
  }
}
