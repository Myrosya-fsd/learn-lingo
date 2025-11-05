import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";
import Modal from "../Modal/Modal.jsx";
import { logoutUser } from "../../firebaseAuth.js";

const Header = ({ user }) => {
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
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/teachers"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Teachers
        </NavLink>
      </nav>

      {/* Якщо користувач не залогінений */}
      {!user && (
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
      )}

      {/* Якщо користувач залогінений */}
      {user && (
        <div className={styles.hello}>
          <h3 className={styles.helloText}>Hello, {user.email}</h3>
          <button onClick={logoutUser} className={styles.btnClos}>
            Exit
          </button>
        </div>
      )}

      {/* Модальні вікна */}
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
