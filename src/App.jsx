import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomePage from "./page/HomePage/HomePage.jsx";
import TeachersPage from "./page/TeachersPage/TeachersPage.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
      </Routes>
    </>
  );
}

export default App;
