import { createContext, useMemo, useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  // حالات البيانات
  const [loading, setLoading] = useState(true);
  const [allMeals, setAllMeals] = useState([]);
  const [meals, setMeals] = useState([]);
  const [userRole, setUserRole] = useState("user");
  const [isLoggedInState, setIsLoggedInState] = useState(() => {
    // التحقق من حالة تسجيل الدخول من localStorage

    return localStorage.getItem("isLoggedIn") === "true" ? true : false;
  });
  const [search, setSearch] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [mealRate, setMealRate] = useState(0);
  // جلب بيانات المستخدم الحالي وتفضيلاته
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const favs = userDoc.data().userActivety?.favorites || [];
          setUserFavorites(favs);
        }
      } else {
        setUserId(null);
        setUserFavorites([]);
      }
    });
    return () => unsub();
  }, []);

  // جلب الأطباق مع دمج حالة المفضلة من userFavorites
  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const menuSnapshot = await getDocs(collection(db, "menu"));
        const items = menuSnapshot.docs.map((doc) => {
          const data = doc.data();
       
          return {
            id: data.id,
            name: data.name,
            category: data.category,
            description: data.description,
            mealType: data.mealType,
            price: data.price,
            img: data.img || data.image || "",
            rate: data.rate,
            isFavorite: userFavorites.includes(data.id), // هنا فقط
          };
        });
        setAllMeals(items);
        setMeals(items);
        localStorage.setItem("allMeals", JSON.stringify(items));
        localStorage.setItem("meals", JSON.stringify(items));
      } catch (error) {
        alert("حدث خطأ أثناء جلب البيانات: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
    // أعد تحميل الأطباق عند تغير userFavorites
  }, [userFavorites, mealRate]);
  // تحديث حقل معين في الطبق
  const updateMealField = async (id, updatedFields) => {
    try {
      const mealRef = doc(db, "menu", id);
      await updateDoc(mealRef, updatedFields);
    } catch (error) {
      console.error("خطأ أثناء تحديث الطبق:", error);
    }
  };

  const UserActivatyFn = async (id, updatedFields) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, updatedFields);
    } catch (error) {
      console.error("خطأ أثناء تحديث النشاط:", error);
    }
  };

  // تحديث localStorage+ firbase عند تغيير meals
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
    localStorage.setItem("allMeals", JSON.stringify(allMeals));
  }, [meals, allMeals]);

  // ترتيب الأطباق حسب التقييم

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

  // تحديث المفضلة في بيانات المستخدم فقط
  const toggleFavorite = (id) => {
    if (!userId) return;
    let updatedFavorites;
    if (userFavorites.includes(id)) {
      updatedFavorites = userFavorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...userFavorites, id];
    }
    setUserFavorites(updatedFavorites);

    // تحديث في الداتابيز
    try {
      const userRef = doc(db, "users", userId);
      updateDoc(userRef, {
        "userActivety.favorites": updatedFavorites,
      });
    } catch (error) {
      console.error("خطأ أثناء تحديث المفضلة:", error);
    }
    // تحديث التقيم في  بيانات الأطباق

    if (meals) {
      meals.map((meal) => {
        if (meal.id === id) {
          console.log("meal", meal.rate);
          console.log("meal", meal.isFavorite);

          updateMealField(String(meal.id), {
            rate: meal.isFavorite ? meal.rate - 1 : meal.rate + 1,
          });
        }
        return meal;
      });
      setMealRate((prevRate) => prevRate + 1); // تحديث معدل الوجبة
    }
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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
