import { NextResponse, NextRequest } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req: NextRequest) {
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
      return NextResponse.json({ message: "No user" }, { status: 401 });
    }

    // Create profile in DB
    const profile = await prisma.profile.create({
      data: {
        firstName: firstname,
        lastName: lastname,
        state,
        zipCode: zipcode,
        cellPhone: phone,
        city,
        currentStatus,
        user: {
          connect: {
            id: userID,
          },
        },
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating profile:", error);
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
