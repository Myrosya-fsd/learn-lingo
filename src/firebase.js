// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAudNKvSIhwWujpXeVN_WI0tY5k8ms9u1Q",
  authDomain: "learnlingo-1dd04.firebaseapp.com",
  projectId: "learnlingo-1dd04",
  storageBucket: "learnlingo-1dd04.firebasestorage.app",
  messagingSenderId: "6457390671",
  appId: "1:6457390671:web:179d37c2f655aea93fdc3a",
  measurementId: "G-RJEN5GM48G",
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація модулів, які ти реально використовуєш
export const auth = getAuth(app);

export const db = getDatabase(
  app,
  "https://learnlingo-1dd04-default-rtdb.europe-west1.firebasedatabase.app"
);
