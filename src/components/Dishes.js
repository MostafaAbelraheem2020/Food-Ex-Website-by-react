import * as React from "react";
import { useContext } from "react";
import MyContext from "./MainDataContext";
import { Link } from "react-router-dom";
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Chip 
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EastIcon from "@mui/icons-material/East";

function Dishes() {
  const { meals, toggleFavorite } = useContext(MyContext);

  if (!Array.isArray(meals) || meals.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: 'center', opacity: 0.6 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
          No dishes found in this category
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 4, lg: 6 }, py: 6 }}>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {meals.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={item.id}>
            <Card
              sx={{
                borderRadius: "32px",
                overflow: "hidden",
                border: "none",
                boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-12px)",
                  boxShadow: "0 22px 48px -12px rgba(0, 0, 0, 0.12)",
                },
                position: "relative",
              }}
            >
              {/* Image & Badge Area */}
              <Box sx={{ position: "relative", pt: "75%", overflow: "hidden" }}>
                <Link to={`/dish/${item.id}`}>
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.name}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s ease",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                </Link>
                <Chip
                  label={item.mealType}
                  sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    bgcolor: "rgba(38, 129, 108, 0.9)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    backdropFilter: "blur(4px)",
                    height: "24px",
                  }}
                />
                <IconButton
                  onClick={() => toggleFavorite(item.id)}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(8px)",
                    "&:hover": { bgcolor: "white" },
                    width: 40,
                    height: 40,
                    zIndex: 2
                  }}
                >
                  {item.isFavorite ? (
                    <FavoriteIcon sx={{ color: "#d32f2f", fontSize: 22 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "rgba(0,0,0,0.5)", fontSize: 22 }} />
                  )}
                </IconButton>
              </Box>

              {/* Card Content Area */}
              <CardContent sx={{ p: 3, bgcolor: "white" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 4,
                  }}
                >
                  <Link
                    to={`/dish/${item.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        lineHeight: 1.3,
                        mb: 0.5,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <span
                      className="material-symbols-outlined"
                      style={{ color: "#ED6C02", fontSize: "16px", fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 800, color: "rgba(0,0,0,0.8)" }}
                    >
                      {item.rate}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textTransform: "uppercase",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        color: "rgba(0,0,0,0.4)",
                        mb: 0.2,
                        fontSize: "9px",
                      }}
                    >
                      Daily Price
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Plus Jakarta Sans",
                        fontWeight: 900,
                        color: "#26816C",
                      }}
                    >
                      ${item.price}
                    </Typography>
                  </Box>
                  <Link to={`/dish/${item.id}`}>
                    <IconButton
                      sx={{
                        bgcolor: "rgba(0,0,0,0.03)",
                        "&:hover": { bgcolor: "#26816C", color: "white" },
                        borderRadius: "14px",
                        width: 44,
                        height: 44,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <EastIcon fontSize="small" />
                    </IconButton>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dishes;
