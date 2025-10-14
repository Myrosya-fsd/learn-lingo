import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";
import Modal from "../Modal/Modal.jsx";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className={styles.header}>
      <div>
        <NavLink to="/" end>
          <svg className={styles.icon} width="133" height="38">
            <use xlinkHref="/symbol-defs.svg#icon-logo" />
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
            <use xlinkHref="/symbol-defs.svg#icon-log-in" />
          </svg>
          <button className={styles.headerLink} onClick={openModal}>
            Log in
          </button>
        </div>
        <div className={styles.loginWrapper}>
          <Link to="/registration" className={styles.headerLinkRight}>
            Registration
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Login onClose={closeModal} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
