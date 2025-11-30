import React from "react";
import "../components/loginAndRegister.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  // تسجيل المستخدم باستخدام Firebase

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // تحديث ملف تعريف المستخدم باسم المستخدم
      await updateProfile(userCredential.user, {
        displayName: userName,
        phoneNumber: mobile,
      });

      // حفظ بيانات المستخدم في Firestore

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        role: "user", // تعيين الدور الافتراضي للمستخدم
        userName: userName,
        password: password,
        phoneNumber: mobile,
        createdAt: new Date().toISOString(), // حفظ تاريخ الإنشاء
        uid: userCredential.user.uid, // حفظ معرف المستخدم
        userActivety: {
          lastLogin: new Date().toISOString(), // حفظ آخر تسجيل دخول
          isActive: false, // تعيين الحالة النشطة للمستخدم
          favorites: [], // قائمة المفضلات فارغة
        },
      });

      Swal.fire({
        title: " تم التسجيل بنجاح",
        text: `مرحباً ${userName}`,
        icon: "success",
        timer: 2000, // يغلق تلقائيًا بعد 2 ثوانٍ
        showConfirmButton: false,
      });
      navigate("/Login");
    } catch (error) {
      alert("error :    " + "  " + error.message);
    }
  };

  return (
    <div className="form-container">
      <form className="form-container form" onSubmit={handleRegister}>
        <h2 className="form-container h2">إنشاء حساب</h2>
        <input
          className="form-container input"
          value={userName}
          type="name"
          placeholder="userName"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          className="form-container input"
          value={mobile}
          type="number"
          placeholder="Mobile Number"
          required
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />
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
          Register
        </button>
        <p>
          لديك حساب بالفعل؟ <Link to="/Login">سجل الدخول</Link>
        </p>
      </form>
    </div>
  );
}
