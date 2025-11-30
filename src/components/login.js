import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import MyContext from "./MainDataContext";
import Swal from "sweetalert2";
export default function Login() {
  const { setIsLoggedInState, UserActivatyFn } = React.useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  // تسجيل الدخول باستخدام Firebase
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "أهلاً بك!",
        text: "تم تسجيل دخولك بنجاح",
        icon: "success",
        timer: 2000, // يغلق تلقائيًا بعد 2 ثوانٍ
        showConfirmButton: false,
      });
      localStorage.setItem("isLoggedIn", "true");
      // حفظ حالة تسجيل الدخول في localStorage
      setIsLoggedInState(true);
      // تحديث حالة تسجيل الدخول في firebase

      UserActivatyFn(auth.currentUser.uid, {
        "userActivety.lastLogin": new Date().toISOString(),
        "userActivety.isActive": false,
      });

      navigator("/");
    } catch (error) {
      Swal.fire({
        title: "!خطأ",
        text: error.message,
        icon: "error",
        timer: 1000, // يغلق تلقائيًا بعد 1 ثانية
        showConfirmButton: false,
      });
      setEmail("");
      setPassword("");
      setIsLoggedInState(false);
    }
  };
  return (
    <div className="form-container">
      <form className="form-container form" onSubmit={handleLogin}>
        <h2 className="form-container h2">تسجيل الدخول</h2>

        <input
          className="form-container input"
          value={email}
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="form-container input"
          value={password}
          type="password"
          placeholder="Password "
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="form-container button " type="submit">
          Login
        </button>
        <p>
          ليس لديك حساب بالفعل؟ <Link to="/Register">إنشاء حساب</Link>
        </p>
      </form>
    </div>
  );
}
