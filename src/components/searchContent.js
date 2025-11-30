import React from "react";

// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Dishes from "./Dishes";
// import Typography from "@mui/material/Typography";
import MyContext from "./MainDataContext";
import { useContext } from "react";

function SearchContent() {
  const { meal, setMeal, handelMealSecondeFilter, sortedMeals } =
    useContext(MyContext);

  function handleMealClick(event) {
    handelMealSecondeFilter(event);
  }

  return (
    <Grid sx={{ margin: "0" }} container spacing={2}>
      {/* العمود الأيسر */}
      <Grid
        style={{
          padding: "2px 5px",
          borderRight: "1px solid #eee",
          borderLeft: "1px solid #eee",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
        item
        xs={3}
      >
        <Button
          variant="contained"
          onClick={() => {
            setMeal(sortedMeals);
          }}
          style={{
            width: "100%",
            fontSize: "18px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#26816c",
          }}
          startIcon={<ThumbUpOffAltIcon />}
          endIcon={<ArrowRightAltIcon />}
        >
          Top Dishes
        </Button>
        <br />
        <div>
          {" "}
          {sortedMeals.map((meal) => (
            <Button
              variant="text"
              key={meal.id}
              onClick={() => {
                handleMealClick(meal.id);
                console.log(meal.rate);
              }}
              fullWidth
              sx={{
                width: "100%",
                padding: "2px 5px",
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "14px",
                color: "gray",
                mt: "1px",
                "&:hover": {
                  backgroundColor: "#26816c",
                  color: "white",
                },
              }}
            >
              {meal.name}
            </Button>
          ))}
        </div>
      </Grid>

      {/* العمود الأوسط */}
      <Grid
        style={{
          padding: "2px 5px",
          borderRight: "1px solid #eee",
          borderLeft: "1px solid #eee",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
        item
        xs={9}
      >
        <Dishes meal={meal} />
      </Grid>
    </Grid>
  );
}

export default SearchContent;
