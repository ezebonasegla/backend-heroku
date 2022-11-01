import { MONGO_URI, FIREBASE_TYPE, FIREBASE_TOKEN_URI, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_AUTH_URI, FIREBASE_AUTH_PROVIDER_X509_CERT_URL, FIREBASE_CLIENT_X509_CERT_URL } from "../config.js";

//Base de datos (mongoDB-mongoose)

import { connect } from "mongoose";
export const url = process.env.MONGO_URI;
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
  type: process.env.FIREBASE_TYPE ? process.env.FIREBASE_TYPE.replace(/\n/gm, "/n") : undefined,
  project_id: process.env.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PROJECT_ID.replace(/\n/gm, "/n") : undefined,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID ? process.env.FIREBASE_PRIVATE_KEY_ID.replace(/\n/gm, "/n") : undefined,
  private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\n/gm, "/n") : undefined,
  client_email: process.env.FIREBASE_CLIENT_EMAIL ? process.env.FIREBASE_CLIENT_EMAIL.replace(/\n/gm, "/n") : undefined,
  client_id: process.env.FIREBASE_CLIENT_ID ? process.env.FIREBASE_CLIENT_ID.replace(/\n/gm, "/n") : undefined,
  auth_uri: process.env.FIREBASE_AUTH_URI ? process.env.FIREBASE_AUTH_URI.replace(/\n/gm, "/n") : undefined,
  token_uri: process.env.FIREBASE_TOKEN_URI ? process.env.FIREBASE_TOKEN_URI.replace(/\n/gm, "/n") : undefined,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL ? process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL.replace(/\n/gm, "/n") : undefined,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL ? process.env.FIREBASE_CLIENT_X509_CERT_URL.replace(/\n/gm, "/n") : undefined,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://ecommerce-4b8f5.firebaseio.com'
});

export const dbFirebase = admin.firestore();
