import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <NavLink to="/" end>
          <svg className={styles.icon} width="133" height="38">
            <use xlinkHref="/public/symbol-defs.svg#icon-logo" />
          </svg>
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
      </nav>
      <div className={styles.authContainer}>
        <div className={styles.loginWrapper}>
          <svg className={styles.icon} width="20" height="20">
            <use xlinkHref="/public/symbol-defs.svg#icon-log-in" />
          </svg>
          <Link to="/login" className={styles.headerLink}>
            Log in
          </Link>
        </div>
        <div className={styles.loginWrapper}>
          <Link to="/registration" className={styles.headerLinkRight}>
            Registration
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
