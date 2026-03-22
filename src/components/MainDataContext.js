import { createContext, useMemo, useState, useEffect } from "react";
import {
  // collection,
  doc,
  getDoc,
  // getDocs,
  // updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import fallbackMeals from "./mealsData.json";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  // حالات البيانات
  const [loading, setLoading] = useState(true);
  const [allMeals, setAllMeals] = useState([]);
  const [meals, setMeals] = useState([]);
  const [userRole, setUserRole] = useState("user");
  const [isLoggedInState, setIsLoggedInState] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true" ? true : false;
  });
  const [search, setSearch] = useState(false);
  // const [userId, setUserId] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [mealRate, setMealRate] = useState(0);

  // جلب بيانات المستخدم الحالي وتفضيلاته
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setUserId(user.uid);
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const favs = userDoc.data().userActivety?.favorites || [];
            setUserFavorites(favs);
          }
        } catch (e) {
          console.warn("Firestore Auth Error (Ignored for now):", e.message);
        }
      } else {
        // setUserId(null);
        setUserFavorites([]);
      }
    });
    return () => unsub();
  }, []);

  // جلب الأطباق - الاعتماد على JSON محلي حصرياً مؤقتاً
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      
      /* 
      try {
        const menuSnapshot = await getDocs(collection(db, "menu"));
        const items = menuSnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, isFavorite: userFavorites.includes(data.id) };
        });
        setAllMeals(items);
        setMeals(items);
      } catch (error) { ... }
      */

      // الاعتماد على الداتا الافتراضية من ملف جيسون
      const items = fallbackMeals.map(item => ({
        ...item,
        isFavorite: userFavorites.includes(item.id)
      }));
      setAllMeals(items);
      setMeals(items);
      setLoading(false);
    };
    
    fetchMenu();
  }, [userFavorites, mealRate]);

  // تحديث حقل معين في الطبق (معطل مؤقتاً)
  const updateMealField = async (id, updatedFields) => {
    console.log("Local Update (Simulated):", id, updatedFields);
    /* 
    try {
      const mealRef = doc(db, "menu", id);
      await updateDoc(mealRef, updatedFields);
    } catch (error) { ... }
    */
  };

  // تحديث النشاط (معطل مؤقتاً)
  const UserActivatyFn = async (id, updatedFields) => {
    console.log("Activity Update (Simulated):", id, updatedFields);
    /* 
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, updatedFields);
    } catch (error) { ... } 
    */
  };

  // مزامنة حالة الأطباق المحلية
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
    localStorage.setItem("allMeals", JSON.stringify(allMeals));
  }, [meals, allMeals]);

  const sortedMeals = useMemo(
    () => [...allMeals].sort((a, b) => b.rate - a.rate),
    [allMeals]
  );

  // البحث في الأطباق
  const handelSearch = (query) => {
    if (query.trim() !== "") {
      const filtered = sortedMeals.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setMeals(filtered);
      setSearch(true);
    } else {
      setMeals(allMeals);
      setSearch(false);
    }
  };

  // المفضلات (تعمل محلياً فقط)
  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (userFavorites.includes(id)) {
      updatedFavorites = userFavorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...userFavorites, id];
    }
    setUserFavorites(updatedFavorites);

    if (meals) {
      const updated = meals.map((meal) => {
        if (meal.id === id) {
          return { ...meal, isFavorite: !meal.isFavorite };
        }
        return meal;
      });
      setMeals(updated);
      setMealRate((prevRate) => prevRate + 1);
    }
    
    localStorage.setItem("localFavorites", JSON.stringify(updatedFavorites));

    /* 
    if (userId) {
      const userRef = doc(db, "users", userId);
      updateDoc(userRef, { "userActivety.favorites": updatedFavorites });
    }
    */
  };

  return (
    <MyContext.Provider
      value={{
        meals,
        setMeals,
        search,
        setSearch,
        handelSearch,
        sortedMeals,
        toggleFavorite,
        isLoggedInState,
        setIsLoggedInState,
        loading,
        userRole,
        setUserRole,
        UserActivatyFn,
        updateMealField,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
