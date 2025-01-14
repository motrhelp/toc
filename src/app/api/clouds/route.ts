import { NextRequest, NextResponse } from 'next/server';
import { getClouds } from '../../../db/actions/clouds';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const user = req.nextUrl.searchParams.get('user'); // Get user from query params
    if (!user) {
      return NextResponse.json(
        { error: 'User parameter is required' },
        { status: 400 }
      );
    }

    const clouds = await getClouds(user);
    return NextResponse.json(clouds, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}