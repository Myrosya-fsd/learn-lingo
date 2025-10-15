import { useEffect, useState } from "react";
import { getTeachers } from "../../firebaseTeachers";
import { Star } from "lucide-react";
import styles from "./TeachersPage.module.css";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  // --- Фільтри ---
  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState("A1 Beginner");
  const [price, setPrice] = useState(25);

  // --- Отримати дані з Firebase ---
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeachers();
      console.log("🔥 Firebase data:", data);
      setTeachers(data);
      setFilteredTeachers(data);
    };
    fetchData();
  }, []);

  // --- Фільтрація ---
  useEffect(() => {
    const filtered = teachers.filter((t) => {
      const langs = Array.isArray(t.languages) ? t.languages : [];
      const lvls = Array.isArray(t.levels) ? t.levels : [];

      return (
        langs.includes(language) &&
        lvls.includes(level) &&
        Number(t.price_per_hour) === Number(price)
      );
    });

    setFilteredTeachers(filtered);
  }, [language, level, price, teachers]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* --- Блок фільтрів --- */}
      <div className={styles.filterBlock}>
        <div className={styles.teachersLengvichBlock}>
          <h3 className={styles.teachersTitle}>Languages</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.border}
          >
            <option>English</option>
            <option>French</option>
            <option>German</option>
            <option>Italian</option>
            <option>Korean</option>
            <option>Mandarin Chinese</option>
            <option>Spanish</option>
            <option>Vietnamese</option>
          </select>
        </div>

        <div className={styles.teachersKnowBlock}>
          <h3 className={styles.teachersTitle}>Level of knowledge</h3>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={styles.border}
          >
            <option>A1 Beginner</option>
            <option>A2 Elementary</option>
            <option>B1 Intermediate</option>
            <option>B2 Upper-Intermediate</option>
            <option>C1 Advanced</option>
            <option>C2 Proficient</option>
          </select>
        </div>

        <div className={styles.teachersPriceBlock}>
          <h3 className={styles.teachersTitle}>Price</h3>
          <select
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={styles.border}
          >
            <option value={25}>25 $</option>
            <option value={27}>27 $</option>
            <option value={28}>28 $</option>
            <option value={30}>30 $</option>
            <option value={32}>32 $</option>
            <option value={35}>35 $</option>
          </select>
        </div>
      </div>

      {/* --- Список викладачів --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-2xl shadow-md p-4"
            >
              <img
                src={t.avatar_url}
                alt={t.name || "Teacher"}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {t.name} {t.surname}
                </h2>
                <p className="text-gray-600 text-sm">
                  Speaks:{" "}
                  {Array.isArray(t.languages)
                    ? t.languages.join(", ")
                    : t.languages}
                </p>
                <p className="mt-2 text-sm text-gray-700">
                  {t.lesson_info || "No lesson info provided."}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Lessons done: {t.lessons_done || 0}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{t.rating || "—"}</span>
                  <span className="text-gray-500 text-sm">
                    | {t.price_per_hour}$ / hour
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(t.levels || []).map((lvl, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 border px-2 py-1 rounded-full"
                    >
                      {lvl}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No teachers found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}
