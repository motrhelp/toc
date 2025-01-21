import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/db/firebase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ cloudId: string }> }
) {
    try {
        const cloudId = (await params).cloudId

        if (!cloudId) {
            return NextResponse.json(
                { error: 'Missing or invalid cloudId parameter' },
                { status: 400 }
            );
        }

        const cloudDocRef = doc(db, 'clouds', cloudId);
        const snapshot = await getDoc(cloudDocRef);

        if (!snapshot.exists()) {
            return NextResponse.json({ error: 'Cloud not found' }, { status: 404 });
        }

        const data = { id: snapshot.id, ...snapshot.data() };
        return NextResponse.json(data, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error retrieving cloud:', error);
        return NextResponse.json(
            { error: 'Error retrieving cloud' },
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
