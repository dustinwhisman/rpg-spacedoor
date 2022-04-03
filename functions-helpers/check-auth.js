/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);

const checkAuth = async (event) => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

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

module.exports = {
  checkAuth,
};
