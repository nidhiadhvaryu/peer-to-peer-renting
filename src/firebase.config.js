import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "awesome-renting.firebaseapp.com",
  projectId: "awesome-renting",
  storageBucket: "awesome-renting.appspot.com",
  messagingSenderId: "702713068942",
  appId: "1:702713068942:web:6620f924cf541a261238df",
  measurementId: "G-K8MBQ4MSF6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const functions = getFunctions(app);
export const analytics = getAnalytics(app);