import { NextResponse, NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req: NextRequest) {
  try {
    const userID = getDataFromToken(req);
    if (!userID) {
      return NextResponse.json({ message: "No user" }, { status: 401 });
    }

    const profileData = await prisma.profile.findUnique({
      where: {
        userId: userID,
      },
    });

    if (!profileData) {
      return NextResponse.json(
        { message: "No profile found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data from Profle", profileData },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error creating profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
