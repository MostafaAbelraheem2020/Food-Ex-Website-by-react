import "./dR.css";
import logo from "../imgs/default-cover.png";

import MAinBTnsComponents from "./MAinBTnsComponents";
import SecondBar from "./secondBar";
import FilterBtns from "./filterBtns";
import Content from "./content";
import { Container } from "@mui/material";
import MyContext from "./MainDataContext";

import { useContext } from "react";

function FoodWebsite() {
  const { setMeals, sortedMeals } = useContext(MyContext); // استخدام البيانات من السياق

  const handleFilter = (mealType) => {
    if (mealType === "All") {
      setMeals(sortedMeals); // عرض جميع الوجبات
    } else {
      setMeals(sortedMeals);
      const filteredMeals = sortedMeals.filter(
        (item) => item.mealType === mealType
      );
      setMeals(filteredMeals); // تصفية الوجبات بناءً على النوع
    }
  };

  return (
    <div className="dR-mainDev">
      <MAinBTnsComponents />
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <img
          style={{
            width: "100%",
          }}
          className="mainImg"
          src={logo}
          alt="mainImg"
        />
      </div>
      <Container maxWidth="xlg">
        <SecondBar />
        <FilterBtns
          handleBreakfast={() => handleFilter("Breakfast")}
          handleLunch={() => handleFilter("Lunch")}
          handleDinner={() => handleFilter("Dinner")}
          handleAllDishes={() => handleFilter("All")}
        />
        <Content />
      </Container>
    </div>
  );
}

export default FoodWebsite;
