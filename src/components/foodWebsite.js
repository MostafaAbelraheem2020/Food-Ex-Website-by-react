import "./dR.css";
import heroImg from "../imgs/default-cover.png";
import MAinBTnsComponents from "./MAinBTnsComponents";
import SecondBar from "./secondBar";
import FilterBtns from "./filterBtns";
import Content from "./content";
import { Container, Box, Typography, Button } from "@mui/material";
import MyContext from "./MainDataContext";
import { useContext } from "react";

function FoodWebsite() {
  const { setMeals, sortedMeals } = useContext(MyContext);

  const handleFilter = (mealType) => {
    if (mealType === "All") {
      setMeals(sortedMeals);
    } else {
      const filteredMeals = sortedMeals.filter(
        (item) => item.mealType === mealType
      );
      setMeals(filteredMeals);
    }
  };

  return (
    <Box sx={{ bgcolor: "#F9FAF7", minHeight: "100vh", pb: 10 }}>
      <MAinBTnsComponents />
      
      {/* Premium Hero Section - Incremental Height Reduction */}
      <Box 
        sx={{ 
          width: "100%", 
          height: { xs: "250px", sm: "300px", md: "400px" }, 
          position: "relative",
          overflow: "hidden",
          mb: 6
        }}
      >
        <Box 
          component="img"
          src={heroImg}
          alt="Culinary Backdrop"
          sx={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            filter: "brightness(0.65)"
          }}
        />
        <Box 
          sx={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 3, sm: 6, md: 10 },
            textAlign: { xs: "center", md: "left" },
            background: "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 70%)"
          }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              color: "white", 
              fontFamily: "Plus Jakarta Sans", 
              fontWeight: 900,
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              lineHeight: 1.2,
              mb: 1.5,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            Savor the <br />
            <span style={{ color: "#45CBAF" }}>Crafted</span> Moments.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "rgba(255,255,255,0.9)", 
              maxWidth: "400px", 
              mb: 3,
              fontSize: { xs: "0.85rem", md: "1rem" },
              lineHeight: 1.6
            }}
          >
            Experience the finest selection of authentic dishes, prepared with passion and curated for excellence.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 2 }}>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: "#26816C", 
                borderRadius: "12px", 
                px: 4, 
                py: 1.2, 
                fontWeight: 700,
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": { bgcolor: "#1e6656" }
              }}
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now
            </Button>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" id="menu-section">
        <SecondBar />
        <FilterBtns
          handleBreakfast={() => handleFilter("Breakfast")}
          handleLunch={() => handleFilter("Lunch")}
          handleDinner={() => handleFilter("Dinner")}
          handleAllDishes={() => handleFilter("All")}
        />
        <Content />
      </Container>
    </Box>
  );
}

export default FoodWebsite;
