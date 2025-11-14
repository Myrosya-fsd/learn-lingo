import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers } from "../../redux/teachersSlice";
import { toggleFavorite } from "../../redux/favoritesSlice";
import TeachersCard from "../../components/TeachersCard/TeachersCard";
import styles from "./TeachersPage.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function TeachersPage() {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.list);
  const favorites = useSelector((state) => state.favorites);

  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState("A1 Beginner");
  const [price, setPrice] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [priceOptions, setPriceOptions] = useState([]);

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter((t) => {
      const langs = Array.isArray(t.languages) ? t.languages : [];
      const lvls = Array.isArray(t.levels) ? t.levels : [];
      const matchLanguage = !language || langs.includes(language);
      const matchLevel = !level || lvls.includes(level);
      const matchPrice = !price || Number(t.price_per_hour) === Number(price);
      return matchLanguage && matchLevel && matchPrice;
    });
    setFilteredTeachers(filtered);
  }, [language, level, price, teachers]);

  useEffect(() => {
    const prices = teachers.map((t) => t.price_per_hour);
    const uniquePrices = [...new Set(prices)].sort((a, b) => a - b);
    setPriceOptions(uniquePrices);
  }, [teachers]);

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleFavorite = (id) => {
    if (!user) {
      // 1. Спочатку перевіряємо, чи користувач залогінений
      showPopupMessage("Please log in to add favorites");
      return;
    }

    // 2. Додаємо або видаляємо фаворита через Redux
    const isFav = favorites.includes(id); // поточний стан
    dispatch(toggleFavorite(id));

    // 3. Відразу показуємо popup
    showPopupMessage(isFav ? "Removed from favorites" : "Added to favorites");
  };

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  return (
    <div className={styles.blockTeachers}>
      {showPopup && (
        <div className={`${styles.popup} ${showPopup ? styles.show : ""}`}>
          {popupMessage}
        </div>
      )}

      {/* --- Filters --- */}
      <div className={styles.filterBlock}>
        {/* Language Filter */}
        <div className={styles.teachersLengvichBlock}>
          <h3 className={styles.teachersTitle}>Languages</h3>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.border}
          >
            <option>English</option>
            <option>French</option>
            <option>German</option>
            <option>Italian</option>
            <option>Korean</option>
            <option>Mandarin Chinese</option>
            <option>Spanish</option>
            <option>Vietnamese</option>
          </select>
        </div>

        {/* Level Filter */}
        <div className={styles.teachersKnowBlock}>
          <h3 className={styles.teachersTitle}>Level of knowledge</h3>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={styles.border}
          >
            <option>A1 Beginner</option>
            <option>A2 Elementary</option>
            <option>B1 Intermediate</option>
            <option>B2 Upper-Intermediate</option>
            <option>C1 Advanced</option>
            <option>C2 Proficient</option>
          </select>
        </div>

        {/* Price Filter */}
        <div className={styles.teachersPriceBlock}>
          <h3 className={styles.teachersTitle}>Price</h3>
          <select
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={styles.border}
          >
            <option value="">All prices</option>
            {priceOptions.map((p) => (
              <option key={`price-${p}`} value={p}>
                {p} $
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Teachers --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((t) => (
            <TeachersCard
              key={t.id}
              teacher={t}
              isFavorite={user ? favorites.includes(t.id) : false}
              toggleFavorite={handleFavorite}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No teachers found for the selected filters.
          </p>
        )}
      </div>

      {visibleCount < filteredTeachers.length && (
        <div className={styles.btn}>
          <button
            className={styles.loadMore}
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
