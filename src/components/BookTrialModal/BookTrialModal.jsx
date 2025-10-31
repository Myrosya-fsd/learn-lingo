import React from "react";
import styles from "./BookTrialModal.module.css";

const BookTrialModal = ({ isOpen, onClose, teacher }) => {
  if (!isOpen || !teacher) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <svg className={styles.icon} width="32" height="32">
            <use xlinkHref="../../../public/symbol-defs.svg#icon-x" />
          </svg>
        </button>

        <h2 className={styles.title}>Book trial lesson</h2>
        <p className={styles.subtitle}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={styles.teacher}>
          <img
            className={styles.img}
            src={teacher.avatar_url || "/teacher-avatar.png"}
            alt={teacher.name || "Teacher"}
          />
          <div>
            <p className={styles.text}>Your teacher</p>
            <strong className={styles.name}>
              {teacher.name} {teacher.surname}
            </strong>
          </div>
        </div>

        <form className={styles.form}>
          <label className={styles.text2}>
            What is your main reason for learning English?
          </label>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" name="reason" /> Career and business
            </label>
            <label>
              <input type="radio" name="reason" /> Lesson for kids
            </label>
            <label>
              <input type="radio" name="reason" /> Living abroad
            </label>
            <label>
              <input type="radio" name="reason" /> Exams and coursework
            </label>
            <label>
              <input type="radio" name="reason" /> Culture, travel or hobby
            </label>
          </div>

          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="tel" placeholder="Phone number" />

          <button type="submit" className={styles.bookBtn}>
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTrialModal;
