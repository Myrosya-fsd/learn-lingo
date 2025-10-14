import "./App.css";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "./firebaseAuth";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./page/HomePage/HomePage.jsx";
import TeachersPage from "./page/TeachersPage/TeachersPage.jsx";
import Login from "./components/Login/Login.jsx";
import Registration from "./components/Registration/Registration.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser(setUser);
  }, []);

  return (
    <>
      <div>
        {user ? (
          <>
            <h3>Привіт, {user.email}</h3>
            <button onClick={logoutUser}>Вийти</button>
          </>
        ) : (
          <p></p>
        )}
      </div>

      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
/*
    <div>
      {user ? (
        <>
          <h3>Привіт, {user.email}</h3>
          <button onClick={logoutUser}>Вийти</button>
        </>
      ) : (
        <p>Будь ласка, увійдіть</p>
      )}
    </div>
*/
