import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  FIREBASE_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID,
} from './constants';

const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: `${FIREBASE_PROJECT_ID}`,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `1:${FIREBASE_MESSAGING_SENDER_ID}:web:${FIREBASE_APP_ID}`,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
