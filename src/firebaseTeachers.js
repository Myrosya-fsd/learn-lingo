import { ref, get } from "firebase/database";
import { db } from "./firebase";

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
