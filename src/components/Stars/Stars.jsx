import styles from "./Stars.module.css";

const Stars = () => {
  return (
    <section className={styles.stars}>
      <h2 className={styles.visuallyHidden}>stars</h2>
      <div className={styles.statistic}>
        <div className={styles.textBox}>
          <p className={styles.textFat}>32,000 +</p>
          <p className={styles.textLittle}>Experienced tutors</p>
        </div>
        <div className={styles.textBox}>
          <p className={styles.textFat}>300,000 +</p>
          <p className={styles.textLittle}>5-star tutor reviews</p>
        </div>
        <div className={styles.textBox}>
          <p className={styles.textFat}>120 +</p>
          <p className={styles.textLittle}>Subjects taught</p>
        </div>
        <div className={styles.textBox}>
          <p className={styles.textFat}>200 +</p>
          <p className={styles.textLittle}>Tutor nationalities</p>
        </div>
      </div>
    </section>
  );
};

export default Stars;
