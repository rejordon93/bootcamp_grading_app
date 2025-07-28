import { NextResponse, NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function DELETE(req: NextRequest) {
  try {
    const userID = getDataFromToken(req);

    if (!userID) {
      return NextResponse.json({ message: "No user" }, { status: 401 });
    }

    const deleteProfile = await prisma.profile.delete({
      where: {
        userId: userID,
      },
    });

    return NextResponse.json(
      { message: "Profile deleted", profile: deleteProfile },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
