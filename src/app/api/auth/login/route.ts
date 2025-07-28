import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // ✅ Set isOnline to true
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: { isOnline: true },
    });

    // ✅ Validate password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Set cookie
    // sending data to  role frontend!
    const response = NextResponse.json({
      message: "Login successful",
      email: user.email,
      username: user.username,
      isOnline: user.isOnline,
      token,
      role: user.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
