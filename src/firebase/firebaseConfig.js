// تم الاستعانة بادوات الذكاء الاسطناعي في كتابة هذا الكود
// هذا الكود يقوم بتهيئة Firebase Firestore في مشروع React

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FODEX_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FODEX_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FODEX_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FODEX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FODEX_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_APP_FODEX_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FODEX_FIREBASE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const storage = getStorage(app);
export { db };
export { auth };
