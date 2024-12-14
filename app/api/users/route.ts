import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma-dev';
import { z } from 'zod';
import { userRegistrationSchema } from '@/lib/schema/schema';

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const validatedData = userRegistrationSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { firebaseId: validatedData.firebaseId },
    });
    if (validatedData.isGoogleLogin && existingUser) {
      return NextResponse.json({ message: 'login Successful' }, { status: 200 });
    } 

    if (!validatedData.isGoogleLogin && existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    } 

    // Create a new user
    const user = await prisma.user.create({
      data: {
        firebaseId: validatedData.firebaseId,
        name: validatedData.name,
        role: validatedData.role,
        email: validatedData.email,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}