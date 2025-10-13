import React from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import hero1x from "../../assets/img/img-hero-1x.jpg";
import hero2x from "../../assets/img/img-hero-2x.jpg";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBlox}>
        <h1 className={styles.heroTitle}>
          Unlock your potential with the best language tutors
        </h1>
        <p className={styles.heroText}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your <span>language</span> proficiency to new heights by
          connecting with highly qualified and experienced tutors.
        </p>
        <Link to="/teachers" className={styles.heroLink}>
          Get started
        </Link>
      </div>
      <img
        className={styles.img}
        src={hero1x}
        srcSet={`${hero1x} 1x, ${hero2x} 2x`}
        alt="Students learning languages"
      />
    </section>
  );
};

export default Hero;
