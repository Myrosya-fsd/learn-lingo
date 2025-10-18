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
    <div className={styles.blockTeachers}>
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
            <div key={i} className={styles.block}>
              <img
                src={t.avatar_url}
                alt={t.name || "Teacher"}
                className={styles.photo}
              />
              <div>
                <div className={styles.topBlox}>
                  <p className={styles.text}>Languages</p>
                  <div className={styles.textTop}>
                    <svg className={styles.icon} width="16" height="16">
                      <use xlinkHref="/symbol-defs.svg#icon-book-open" />
                    </svg>
                    <p className={styles.text}>Lessons online</p> |
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#121417",
                      marginRight: "16px",
                    }}
                  >
                    Lessons done: {t.lessons_done || 0}
                  </p>
                  |
                  <div className={styles.blockRating}>
                    <Star className={styles.star} />
                    <span className={styles.spamRating}>
                      Rating: {t.rating || "—"}
                    </span>
                    |
                    <span className={styles.spamRating}>
                      Price / 1 hour: {t.price_per_hour}$
                    </span>
                  </div>
                  <svg className={styles.icon} width="26" height="26">
                    <use xlinkHref="/symbol-defs.svg#icon-heart" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className={styles.name}>
                    {t.name} {t.surname}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#8a8a89",
                      marginBottom: "8px",
                    }}
                  >
                    Speaks:{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textDecorationSkipInk: "none",
                        color: "#121417",
                        fontStyle: "normal",
                        background: "#ffffff",
                      }}
                    >
                      {Array.isArray(t.languages)
                        ? t.languages.join(", ")
                        : t.languages}
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#8a8a89",
                      marginBottom: "8px",
                    }}
                  >
                    Lesson Info:
                    <span
                      style={{
                        textDecorationSkipInk: "none",
                        color: "#121417",
                        fontStyle: "normal",
                        background: "#ffffff",
                      }}
                    >
                      {t.lesson_info || "No lesson info provided."}
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#8a8a89",
                      marginBottom: "8px",
                    }}
                  >
                    Conditions:
                    <span
                      style={{
                        textDecorationSkipInk: "none",
                        color: "#121417",
                        fontStyle: "normal",
                        background: "#ffffff",
                      }}
                    >
                      {t.conditions || "No lesson info provided."}
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#8a8a89",
                      marginBottom: "8px",
                    }}
                  >
                    Experience
                    <span
                      style={{
                        textDecorationSkipInk: "none",
                        color: "#121417",
                        fontStyle: "normal",
                        background: "#ffffff",
                      }}
                    >
                      {t.experience || "No lesson info provided."}
                    </span>
                  </p>
                  <div className={styles.levelBlox}>
                    {(t.levels || []).map((lvl, idx) => (
                      <span key={idx} className={styles.level}>
                        {lvl}
                      </span>
                    ))}
                  </div>
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
      <div className={styles.btn}>
        <button className={styles.loadMore}>Load more</button>
      </div>
    </div>
  );
}
