import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (!user) return;

    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [user]);

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleToggleFavorite = (id) => {
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

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/teachers");
      }
    });

    return () => unsub();
  }, [navigate]);

  if (!user) {
    return (
      <div className={styles.blockTeachers}>
        <p className="text-center text-gray-500 mt-10">
          Please log in to view your favorite teachers.
        </p>
        {showPopup && (
          <div className={`${styles.popup} ${showPopup ? styles.show : ""}`}>
            {popupMessage}
          </div>
        )}
      </div>
    );
  }

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
              toggleFavorite={handleToggleFavorite}
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
