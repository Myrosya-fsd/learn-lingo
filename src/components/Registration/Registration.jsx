import styles from "./Registration.module.css";
import { useState } from "react";
import { registerUser } from "../../firebaseAuth.js";

const Registration = ({ onClose }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await registerUser(email, password);
        alert("Registered successfully!");
        onClose();
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  return (
    <>
      <form className={styles.registration} onSubmit={handleSubmit}>
        <div className={styles.registrationTopBox}>
          <h2 className={styles.registrationTitle}>Registration</h2>
          <button className={styles.buttonClose} onClick={onClose}>
            <svg className={styles.icon} width="32" height="32">
              <use xlinkHref="/symbol-defs.svg#icon-x" />
            </svg>
          </button>
        </div>

        <p className={styles.registrationText}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>

        <input
          className={styles.contactBlockInput}
          type="name"
          placeholder="Name"
          value={name}
        />

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
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}

        <button type="submit" className={styles.loginBtn}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Registration;
