import { useEffect, useState } from "react";
import { getTeachers } from "../../firebaseTeachers";
import TeachersCard from "../../components/TeachersCard/TeachersCard.jsx";
import styles from "./TeachersPage.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function FavoritesPage() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Отримуємо дані користувача (щоб перевірити, чи він залогінений)
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    // Отримуємо список викладачів
    const fetchTeachers = async () => {
      const data = await getTeachers();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    // Завантажуємо favorites
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const toggleFavorite = (id) => {
    if (!user) {
      showPopupMessage("Please log in to manage favorites");
      return;
    }

    setFavorites((prev) => {
      const isFav = prev.includes(id);
      const updated = isFav
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      showPopupMessage(isFav ? "Removed from favorites" : "Added to favorites");
      return updated;
    });
  };

  // Фільтруємо лише викладачів, ID яких у favorites
  const favoriteTeachers = teachers.filter((t) => favorites.includes(t.id));

  return (
    <div className={styles.blockTeachers}>
      {showPopup && (
        <div className={`${styles.popup} ${showPopup ? styles.show : ""}`}>
          {popupMessage}
        </div>
      )}

      {favoriteTeachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {favoriteTeachers.map((t) => (
            <TeachersCard
              key={t.id}
              teacher={t}
              isFavorite={favorites.includes(t.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          You have no favorite teachers yet.
        </p>
      )}
    </div>
  );
}
