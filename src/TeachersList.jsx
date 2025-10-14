import { useEffect, useState } from "react";
import { getTeachers, addTeacher } from "../firebaseTeachers";

export default function TeachersList() {
  const [teachers, setTeachers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeachers();
      setTeachers(data);
    };
    fetchData();
  }, []);

  const handleAddTeacher = async () => {
    const newTeacher = {
      name: "John",
      surname: "Doe",
      languages: ["English", "Spanish"],
      levels: ["A1", "B2"],
      rating: 4.9,
      reviews: 15,
      price_per_hour: 25,
      lessons_done: 120,
      avatar_url: "https://example.com/avatar.jpg",
      lesson_info: "General English, Conversation practice",
      conditions: "Online only",
      experience: "5 years",
    };
    await addTeacher(newTeacher);
    alert("Викладача додано ✅");
  };

  return (
    <div>
      <button onClick={handleAddTeacher}>Додати викладача</button>
      <h2>Список викладачів</h2>
      <ul>
        {Object.entries(teachers).map(([id, teacher]) => (
          <li key={id}>
            {teacher.name} {teacher.surname} — {teacher.languages.join(", ")}(
            {teacher.price_per_hour}$/год)
          </li>
        ))}
      </ul>
    </div>
  );
}
