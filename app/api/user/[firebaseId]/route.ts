import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-dev";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ firebaseId: string }> }
) {
  const firebaseId = (await context.params).firebaseId; // Explicitly await params

  console.log(firebaseId);
  if (!firebaseId) {
    return NextResponse.json(
      { error: "Missing firebaseUserId" },
      { status: 400 }
    );
  }

  try {
    const userInfo = await prisma.user.findUnique({
      where: { firebaseId },
    });

    console.log(userInfo);
    if (!userInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userInfo);
  } catch (error: any) {
    console.error("Error fetching user info:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}