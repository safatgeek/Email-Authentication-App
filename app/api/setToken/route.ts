import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, refreshToken } = await req.json();

  if (!token || !refreshToken) {
    return NextResponse.json(
      { error: "Token or Refresh token missing" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ success: true });

  // Set the refresh token in an HTTP-only cookie
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure in production
    maxAge: 60 * 60 * 24 * 30, // Refresh token expires in 30 days
    path: "/",
  });

  // Set the ID token in an HTTP-only cookie (optional)
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // ID token expires in 7 days (but will need refreshing after 1 hour)
    path: "/",
  });

  return response;
}