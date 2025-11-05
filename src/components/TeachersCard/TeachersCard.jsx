import { useState } from "react";
import BookTrialModal from "../BookTrialModal/BookTrialModal.jsx";
import styles from "./TeachersCard.module.css";

export default function TeachersCard({ teacher, isFavorite, toggleFavorite }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  const handleLevelClick = (lvl) => {
    setSelectedLevel((prev) => (prev === lvl ? null : lvl));
  };

  return (
    <div className={styles.block}>
      <img
        src={teacher.avatar_url}
        alt={teacher.name || "Teacher"}
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
            Lessons done: {teacher.lessons_done || 0}
          </p>
          |
          <div className={styles.blockRating}>
            <svg className={styles.iconStar} width="16" height="16">
              <use xlinkHref="/symbol-defs.svg#icon-star" />
            </svg>
            <span className={styles.spamRating}>
              Rating: {teacher.rating || "—"}
            </span>
            |
            <span className={styles.spamRating}>
              Price / 1 hour:{" "}
              <span style={{ color: "#38CD3E", backgroundColor: "#ffffff" }}>
                {teacher.price_per_hour}$
              </span>
            </span>
          </div>
          <svg
            className={`${styles.icon} ${isFavorite ? styles.active : ""}`}
            width="26"
            height="26"
            onClick={() => toggleFavorite(teacher.id)}
          >
            <use xlinkHref="/symbol-defs.svg#icon-heart" />
          </svg>
        </div>

        <div className="flex-1">
          <h2 className={styles.name}>
            {teacher.name} {teacher.surname}
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
            Speaks:
            <span
              style={{
                textDecoration: "underline",
                textDecorationSkipInk: "none",
                color: "#121417",
                fontStyle: "normal",
                background: "#ffffff",
              }}
            >
              {Array.isArray(teacher.languages)
                ? teacher.languages.join(", ")
                : teacher.languages}
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
              {teacher.lesson_info || "No lesson info provided."}
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
              {teacher.conditions || "No lesson info provided."}
            </span>
          </p>

          <button
            className={styles.readMore}
            onClick={() => setShowExperience((prev) => !prev)}
          >
            {showExperience ? "Hide" : "Read more"}
          </button>

          {showExperience && (
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
                  {teacher.experience || "No experience info provided."}
                </span>
              </p>

              <div style={{ marginTop: "16px" }}>
                {Array.isArray(teacher.reviews) &&
                teacher.reviews.length > 0 ? (
                  teacher.reviews.map((review, idx) => (
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
                          <use xlinkHref="/symbol-defs.svg#icon-star" />
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
                {(teacher.levels || []).map((lvl, idx) => (
                  <span
                    key={idx}
                    className={`${styles.level} ${
                      selectedLevel === lvl ? styles.activeLevel : ""
                    }`}
                    onClick={() => handleLevelClick(lvl)}
                  >
                    {lvl}
                  </span>
                ))}
              </div>

              <button
                className={styles.btnBook}
                onClick={() => setIsModalOpen(true)}
              >
                Book trial lesson
              </button>

              <BookTrialModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                teacher={teacher}
              />
            </>
          )}

          {!showExperience && (
            <div className={styles.levelBlox2}>
              {(teacher.levels || []).map((lvl, idx) => (
                <span key={idx} className={styles.level2}>
                  {lvl}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
