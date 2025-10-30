import { useEffect, useState } from "react";
import { getTeachers } from "../../firebaseTeachers";
import styles from "./TeachersPage.module.css";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState("A1 Beginner");
  const [price, setPrice] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState({});

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeachers();
      setTeachers(data);
    };
    fetchData();
  }, []);

  // --- Фільтрація ---
  useEffect(() => {
    const filtered = teachers.filter((t) => {
      const langs = Array.isArray(t.languages) ? t.languages : [];
      const lvls = Array.isArray(t.levels) ? t.levels : [];

      const matchLanguage = !language || langs.includes(language);
      const matchLevel = !level || lvls.includes(level);
      const matchPrice = !price || Number(t.price_per_hour) === Number(price);

      return matchLanguage && matchLevel && matchPrice;
    });

    setFilteredTeachers(filtered);
  }, [language, level, price, teachers]);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleLevelClick = (teacherId, lvl) => {
    setSelectedLevels((prev) => ({
      ...prev,
      [teacherId]: prev[teacherId] === lvl ? null : lvl,
    }));
  };

  useEffect(() => {
    // Коли сторінка завантажується — отримуємо збережені улюблені
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Коли favorites змінюється — зберігаємо у localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className={styles.blockTeachers}>
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
            <option value="">All prices</option>
            <option value={25}>25 $</option>
            <option value={27}>27 $</option>
            <option value={28}>28 $</option>
            <option value={30}>30 $</option>
            <option value={32}>32 $</option>
            <option value={35}>35 $</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((t, i) => (
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
                    <svg className={styles.iconStar} width="16" height="16">
                      <use xlinkHref="/public/symbol-defs.svg#icon-star" />
                    </svg>
                    <span className={styles.spamRating}>
                      Rating: {t.rating || "—"}
                    </span>
                    |
                    <span className={styles.spamRating}>
                      Price / 1 hour: {t.price_per_hour}$
                    </span>
                  </div>
                  <svg
                    className={`${styles.icon} ${
                      favorites.includes(t.id) ? styles.active : ""
                    }`}
                    width="26"
                    height="26"
                    onClick={() => toggleFavorite(t.id)}
                  >
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
                  <button
                    className={styles.readMore}
                    onClick={() =>
                      setFilteredTeachers((prev) =>
                        prev.map((teacher, idx) =>
                          idx === i
                            ? {
                                ...teacher,
                                showExperience: !teacher.showExperience,
                              }
                            : teacher
                        )
                      )
                    }
                  >
                    {t.showExperience ? "Hide" : "Read more"}{" "}
                  </button>
                  {t.showExperience && (
                    <>
                      <p
                        style={{
                          fontFamily: "var(--font-family)",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "150%",
                          color: "#8a8a89",
                          marginBottom: "8px",
                          marginTop: "8px",
                        }}
                      >
                        Experience:
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

                      <div style={{ marginTop: "16px" }}>
                        {Array.isArray(t.reviews) && t.reviews.length > 0 ? (
                          t.reviews.map((review, idx) => (
                            <div
                              key={idx}
                              style={{
                                padding: "12px 16px",
                                marginBottom: "12px",
                              }}
                            >
                              <p style={{ fontWeight: 600, color: "#121417" }}>
                                {review.reviewer_name}
                                <svg className={styles.iconStar}>
                                  <use xlinkHref="/public/symbol-defs.svg#icon-star" />
                                </svg>
                                {review.reviewer_rating}
                              </p>
                              <p style={{ marginTop: "4px", color: "#555" }}>
                                {review.comment}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p
                            style={{
                              fontFamily: "var(--font-family)",
                              fontWeight: 500,
                              fontSize: "16px",
                              lineHeight: "150%",
                              color: "#8a8a89",
                            }}
                          >
                            No reviews provided.
                          </p>
                        )}
                      </div>
                      <div className={styles.levelBlox}>
                        {(t.levels || []).map((lvl, idx) => (
                          <span
                            key={idx}
                            className={`${styles.level} ${
                              selectedLevels[t.id] === lvl
                                ? styles.activeLevel
                                : ""
                            }`}
                            onClick={() => handleLevelClick(t.id, lvl)}
                          >
                            {lvl}
                          </span>
                        ))}
                      </div>
                      <button className={styles.btnBook}>
                        Book trial lesson
                      </button>
                    </>
                  )}

                  {!t.showExperience && (
                    <div className={styles.levelBlox2}>
                      {(t.levels || []).map((lvl, idx) => (
                        <span key={idx} className={styles.level2}>
                          {lvl}
                        </span>
                      ))}
                    </div>
                  )}
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
      {visibleCount < filteredTeachers.length && (
        <div className={styles.btn}>
          <button
            className={styles.loadMore}
            onClick={(e) => {
              e.currentTarget.blur();
              setVisibleCount((prev) => prev + 3);
            }}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
