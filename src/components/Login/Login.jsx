import { useState } from "react";
import styles from "./Login.module.css";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain at least 6 characters, letters and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(" Logged in successfully!");
      // тут додати запит до сервера
      onClose();
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
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        <input
          className={`${styles.contactBlockInput} ${styles.contactBlockInputBt}`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}

        <button type="submit" className={styles.loginBtn}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
