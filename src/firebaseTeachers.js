import { ref, get } from "firebase/database";
import { db } from "./firebase";

// --- Додати викладача ---
//export const addTeacher = async (teacherData) => {
//  try {
//    const teachersRef = ref(db);
//    const newTeacherRef = push(teachersRef); // створює унікальний ID
//    await set(newTeacherRef, teacherData);
//    console.log(" Викладача додано:", teacherData);
//  } catch (error) {
//   console.error(" Помилка при додаванні викладача:", error);
// }
//};

// --- Отримати всіх викладачів ---
export const getTeachers = async () => {
  try {
    const dbRef = ref(db);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const teachersArray = Object.entries(data).map(([key, teacher]) => ({
        id: key,
        ...teacher,
      }));

      return teachersArray;
    } else {
      console.warn("No teachers data found in the database");
      return [];
    }
  } catch (error) {
    console.error("Error getting teachers:", error);
    return [];
  }
};
