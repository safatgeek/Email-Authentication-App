import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firebaseId,
      location,
      district,
      mobileNumber,
      institution,
      department,
      year,
      experience,
      dateOfBirth,
      gender,
      description,
      isLookingFor,
      interestedSubjects,
      institutionName
    } = body;

    // Validate the required fields
    if (!firebaseId) {
      return NextResponse.json(
        { error: "firebaseId is required" },
        { status: 400 }
      );
    }

    // Upsert the UserInfo (update if exists, create if not)
    const upsertedUserInfo = await prisma.userInfo.upsert({
      where: { firebaseId },
      update: {
        location,
        district,
        mobileNumber,
        institution,
        department,
        year,
        experience,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        description,
        isLookingFor,
        interestedSubjects,
        institutionName

      },
      create: {
        firebaseId,
        location,
        district,
        mobileNumber,
        institution,
        department,
        year,
        experience,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : "",
        gender,
        description,
        isLookingFor,
        interestedSubjects,
        institutionName
      },
    });

    return NextResponse.json(upsertedUserInfo, { status: 200 });
  } catch (error: any) {
    console.error("Error updating UserInfo:", error.message);
    return NextResponse.json(
      { error: "An error occurred while updating user info" },
      { status: 500 }
    );
  }
}
