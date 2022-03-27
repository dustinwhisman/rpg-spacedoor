import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

export const checkAuth = async (event) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  try {
    let idToken = event.headers.authorization;
    if (!idToken) {
      throw new Error('Missing authorization token.');
    }

    // remove 'Bearer ' from token string
    idToken = idToken.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error(error.message);
  }
};
