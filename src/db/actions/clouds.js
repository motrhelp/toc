import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function getClouds(user) {
  const cloudsCol = collection(db, 'clouds');
  const cloudSnapshot = await getDocs(cloudsCol);
  return cloudSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
