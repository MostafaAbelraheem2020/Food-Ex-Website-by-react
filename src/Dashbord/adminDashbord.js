import React, { useEffect, useContext, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import MyContext from "../components/MainDataContext";
import { db } from "../firebase/firebaseConfig";
import LocalMealData from "../components/mealsData.json";
import { Box, Button, Stack, Typography, Paper } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// Admin Dashboard Component
function AdminDashbord() {
  const { setMeals, userRole } = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [mealType, setMealType] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rate, setRate] = useState("");
// const [meals, setLocalMeals] = useState([]);
  const [localMenuItems, setLocalMenuItems] = useState([]);

  useEffect(() => {
    setLocalMenuItems(LocalMealData);
  }, []);

  const addMenuItem = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !mealType || !description || !rate) {
      alert("من فضلك أدخل جميع البيانات");
      return;
    }
    try {
      await addDoc(collection(db, "menu"), {
        name,
        price: Number(price),
        image,
        category,
        mealType,
        description,
        rate: Number(rate),
      });
      alert("تمت الإضافة بنجاح 🎉");
      setMeals((prev) => [
        ...prev,
        {
          name,
          price: Number(price),
          image,
          category,
          mealType,
          description,
          rate: Number(rate),
        },
      ]);
      setName("");
      setPrice("");
      setImage("");
      setCategory("");
      setMealType("");
      setDescription("");
      setRate("");
    } catch (error) {
      console.error("حدث خطأ:", error);
    }
  };

  const uploadAllItems = async () => {
    try {
      if (localMenuItems.length === 0) {
        alert("لا توجد أصناف لرفعها");
        return;
      }
      setOpen(true);
      for (const item of localMenuItems) {
        await setDoc(doc(db, "menu", item.id.toString()), {
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description,
          mealType: item.mealType,
          price: Number(item.price),
          img: item.img,
          rate: Number(item.rate),
          isFavorite: item.isFavorite ?? false,
        });
      }
      setOpen(false);
      alert("تم رفع جميع الأصناف بنجاح 🎉");
      setMeals(localMenuItems);
    } catch (error) {
      console.error("خطأ في رفع البيانات:", error);
      setOpen(false);
      alert("حدث خطأ أثناء رفع البيانات");
    }
  };

  const deleteAllMenuItems = async () => {
    setOpen(true);
    try {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, "menu", document.id))
      );
      await Promise.all(deletePromises);
      setOpen(false);
      alert("✅ تم حذف جميع الأصناف بنجاح");
    } catch (error) {
      console.error("❌ حدث خطأ أثناء الحذف:", error);
      setOpen(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: (theme) => theme.zIndex.drawer + 1000,
        }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 4,
          p: { xs: 1, sm: 3 },
          backgroundColor: "#ececec",
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="#26816c"
          mb={2}
        >
          {userRole === "owner" ? "لوحة تحكم المالك" : "لوحة تحكم المدير"}
        </Typography>
        <Typography variant="h6" align="center" color="#555" mb={3}>
          إدارة الأصناف - إضافة / حذف / رفع دفعة واحدة
        </Typography>

        <Paper
          elevation={4}
          sx={{
            maxWidth: 500,
            mx: "auto",
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            background: "#f8f8f8",
            mb: 4,
          }}
        >
          <form
            onSubmit={addMenuItem}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              fontSize={24}
              margin={0}
              color="#26816c"
            >
              إضافة صنف جديد
            </Typography>
            <input
              type="text"
              placeholder="اسم الصنف"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #bdbdbd",
              }}
            />
            <input
              type="text"
              placeholder="الوصف"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #bdbdbd",
              }}
            />
            <input
              type="text"
              placeholder="التصنيف"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #bdbdbd",
              }}
            />
            <input
              type="text"
              placeholder="نوع الوجبة (Breakfast, Lunch, Dinner)"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #bdbdbd",
              }}
            />
            <input
              type="number"
              placeholder="التقييم"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #bdbdbd",
              }}
            />
            <input
              type="number"
              placeholder="السعر"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #bdbdbd",
              }}
            />
            <input
              type="text"
              placeholder="رابط الصورة"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              style={{
                textAlign: "right",
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #bdbdbd",
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                background: "linear-gradient(90deg, #26816c 0%, #43cea2 100%)",
                fontWeight: "bold",
                fontSize: "18px",
                letterSpacing: "1px",
                py: 1.2,
                borderRadius: 2,
                mt: 1,
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #43cea2 0%, #26816c 100%)",
                },
              }}
            >
              إضافة
            </Button>
          </form>
        </Paper>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#e3f2fd",
              flex: 1,
              minWidth: 220,
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#d32f2f"
              align="center"
              mb={2}
            >
              حذف جميع الأصناف من قاعدة البيانات
            </Typography>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={deleteAllMenuItems}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                py: 1,
                borderRadius: 2,
              }}
            >
              حذف الأصناف
            </Button>
          </Paper>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              background: "#e8f5e9",
              flex: 1,
              minWidth: 220,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#388e3c"
              align="center"
              mb={2}
            >
              رفع جميع الأصناف في الملف الافتراضي مرة واحدة
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={uploadAllItems}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
                py: 1,
                borderRadius: 2,
              }}
            >
              رفع الأصناف
            </Button>
          </Paper>
        </Stack>
      </Box>
    </>
  );
}

export default AdminDashbord;
