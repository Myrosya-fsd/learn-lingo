import { useState } from "react";
import styles from "./Login.module.css";
import { loginUser } from "../../firebaseAuth.js";

const Login = ({ onClose, openRegistration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      setError("Будь ласка, заповніть усі поля.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await loginUser(email, password);
      onClose();
    } catch (err) {
      console.error("Firebase login error:", err.code);

      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential"
      ) {
        setError(
          "Користувача з такими даними не існує. Будь ласка, зареєструйтесь."
        );
        setTimeout(() => {
          onClose();
          openRegistration();
        }, 1500);
      } else if (err.code === "auth/wrong-password") {
        setError("Невірний пароль. Спробуйте ще раз.");
      } else if (err.code === "auth/invalid-email") {
        setError("Введіть правильний формат email.");
      } else {
        setError("Сталася помилка: " + err.message);
      }
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginTopBox}>
        <h2 className={styles.titleForm}>Log In</h2>
        <button className={styles.buttonClose} onClick={onClose}>
          <svg className={styles.icon} width="32" height="32">
            <use xlinkHref="/symbol-defs.svg#icon-x" />
          </svg>
        </button>
      </div>

      <p className={styles.titleText}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.contactBlockInput}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={`${styles.contactBlockInput} ${styles.contactBlockInputBt}`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.loginBtn}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
