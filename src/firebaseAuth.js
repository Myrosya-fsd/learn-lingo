import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { ref, set } from "firebase/database";
import { db } from "./firebase";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Реєстрація нового користувача
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created:", user);

    await set(ref(db, "users/" + user.uid), {
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  } catch (err) {
    console.error("Error creating user:", err.message);
    throw err;
  }
};

// Логін користувача
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Логаут
export const logoutUser = async () => {
  return await signOut(auth);
};

// Отримання поточного користувача
export const getCurrentUser = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
