import { ref, set, push, get, child } from "firebase/database";
import { db } from "./firebase";

// Додати викладача
export const addTeacher = async (teacherData) => {
  const teachersRef = ref(db, "teachers");
  const newTeacherRef = push(teachersRef); // створює унікальний ID
  await set(newTeacherRef, teacherData);
};

// Отримати всіх викладачів
export const getTeachers = async () => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, "teachers"));
  if (snapshot.exists()) {
    return snapshot.val(); // повертає об'єкт з усіма викладачами
  } else {
    return {};
  }
};
