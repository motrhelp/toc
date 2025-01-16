import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/db/firebase';

/**
 * GET /api/clouds?user=<userId>
 * Returns all clouds for the provided user (or all if multi-user not implemented).
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const user = req.nextUrl.searchParams.get('user');
    if (!user) {
      return NextResponse.json(
        { error: 'User parameter is required' },
        { status: 400 }
      );
    }

    // Retrieve from Firestore
    const cloudsCol = collection(db, 'clouds');
    const cloudSnapshot = await getDocs(cloudsCol);
    const clouds = cloudSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return the entire array (or the filtered array)
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

/**
 * PATCH /api/clouds
 * Expects JSON body with a Cloud object to update in Firestore.
 * Example body:
 * {
 *   "id": "...",
 *   "A": "...",
 *   "B": "...",
 *   "C": "...",
 *   "D": "...",
 *   "D_": "..."
 * }
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    // Validate ID
    if (!body.id) {
      return NextResponse.json(
        { error: 'Missing cloud "id" in request body' },
        { status: 400 }
      );
    }

    // Save/merge data to Firestore
    const docRef = doc(db, 'clouds', body.id);
    await setDoc(docRef, body, { merge: true });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
