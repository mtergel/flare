import { initializeApp, cert, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let app;
try {
  app = getApp();
} catch (error) {
  app = initializeApp({
    credential: cert({
      clientEmail: process.env.SERVICE_CLIENT_EMAIL,
      privateKey: process.env.SERVICE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      projectId: process.env.SERVICE_PROJECT_ID,
    }),
    projectId: process.env.SERVICE_PROJECT_ID,
  });
}

const auth = getAuth();
export { app, auth };
