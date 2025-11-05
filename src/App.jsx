import "./App.css";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./firebaseAuth";
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
      <Header user={user} />

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
