import React from "react";
import Button from "@mui/material/Button";
function FilterBtns({
  handleBreakfast,
  handleLunch,
  handleDinner,
  handleAllDishes,
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: {
          xs: "center",
          sm: "center",
          md: "flex-start",
          lg: "flex-start",
          xl: "flex-start",
        },
        margin: "20px 5px",
      }}
    >
      <Button
        onClick={handleAllDishes}
        sx={{
          borderRadius: "50%",
          backgroundColor: "gray",
          color: "white",
          fontSize: { xs: "12px", sm: "16px" },
        }}
        variant="text"
      >
        Menu
      </Button>
      <Button
        onClick={handleBreakfast}
        sx={{ color: "gray", fontSize: { xs: "12px", sm: "16px" } }}
        variant="text"
      >
        Breakfast
      </Button>
      <Button
        onClick={handleLunch}
        sx={{ color: "gray", fontSize: { xs: "12px", sm: "16px" } }}
        variant="text"
      >
        Lunch
      </Button>
      <Button
        onClick={handleDinner}
        sx={{ color: "gray", fontSize: { xs: "12px", sm: "16px" } }}
        variant="text"
      >
        Dinner
      </Button>
    </div>
  );
}

export default FilterBtns;
