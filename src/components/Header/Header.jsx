import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";
import Modal from "../Modal/Modal.jsx";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

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
          <button
            className={styles.headerLink}
            onClick={() => openModal("login")}
          >
            Log in
          </button>
        </div>

        <button
          className={styles.headerLinkRight}
          onClick={() => openModal("registration")}
        >
          Registration
        </button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalType === "login" && (
            <Login
              onClose={closeModal}
              openRegistration={() => openModal("registration")}
            />
          )}
          {modalType === "registration" && (
            <Registration onClose={closeModal} />
          )}
        </Modal>
      )}
    </header>
  );
};

export default Header;
