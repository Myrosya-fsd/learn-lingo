import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { registerUser, loginUser } from "../firebaseAuth";

const schema = yup.object().shape({
  email: yup.string().email("Невірний формат").required("Обовʼязкове поле"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Обовʼязкове поле"),
});

export default function AuthForm({ type = "login", onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      if (type === "register") {
        await registerUser(data.email, data.password);
      } else {
        await loginUser(data.email, data.password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>✖</button>
        <h2>{type === "register" ? "Реєстрація" : "Вхід"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} placeholder="Email" />
          <p>{errors.email?.message}</p>
          <input
            type="password"
            {...register("password")}
            placeholder="Пароль"
          />
          <p>{errors.password?.message}</p>
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {type === "register" ? "Зареєструватися" : "Увійти"}
          </button>
        </form>
      </div>
      <div className="backdrop" onClick={onClose}></div>
    </div>
  );
}
