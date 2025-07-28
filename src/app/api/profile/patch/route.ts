import { NextResponse, NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PATCH(req: NextRequest) {
  try {
    const { firstname, lastname, state, zipcode, phone, city, currentStatus } =
      await req.json();

    if (
      !firstname ||
      !lastname ||
      !state ||
      !zipcode ||
      !phone ||
      !city ||
      !currentStatus
    ) {
      return NextResponse.json(
        { message: "Missing profile data" },
        { status: 400 }
      );
    }

    const userID = getDataFromToken(req);
    if (!userID) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        userId: userID,
      },
      data: {
        firstName: firstname,
        lastName: lastname,
        state,
        zipCode: zipcode,
        cellPhone: phone,
        city,
        currentStatus,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", profile: updatedProfile },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
