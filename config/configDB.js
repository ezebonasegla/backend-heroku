import { MONGO_URI, FIREBASE_TYPE, FIREBASE_TOKEN_URI, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_AUTH_URI, FIREBASE_AUTH_PROVIDER_X509_CERT_URL, FIREBASE_CLIENT_X509_CERT_URL } from "../config.js";

//Base de datos (mongoDB-mongoose)

import { connect } from "mongoose";
export const url = MONGO_URI;
export async function connectMG() {
  try {
    return await connect(url, {
      useNewUrlParser: true,
    });
  } catch (e) {
    throw new Error(e);
  }
}

const dbMongo = await connectMG();
if (!dbMongo) throw "can not connect to the db";

//Base de datos (Firebase)

import admin from "firebase-admin";

export const firebaseConfig = {
  type: FIREBASE_TYPE,
  project_id: FIREBASE_PROJECT_ID,
  private_key_id: FIREBASE_PRIVATE_KEY_ID,
  private_key: FIREBASE_PRIVATE_KEY,
  client_email: FIREBASE_CLIENT_EMAIL,
  client_id: FIREBASE_CLIENT_ID,
  auth_uri: FIREBASE_AUTH_URI,
  token_uri: FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://ecommerce-4b8f5.firebaseio.com'
});

export const dbFirebase = admin.firestore();
