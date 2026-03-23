import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import MyContext from "./MainDataContext";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

function MealDesc() {
  const { meals } = useContext(MyContext);
  const { id } = useParams();
  const selectedMeal = meals.find((item) => item.id === parseInt(id));

  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSpiceLevel("Medium");
    setExtras([]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!selectedMeal) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.6)", fontWeight: 600 }}>Meal not found</Typography>
        <Link to="/" style={{ textDecoration: "none", marginTop: 16 }}>
          <Typography sx={{ color: "#046453", fontWeight: 700, "&:hover": { textDecoration: "underline" } }}>Go back to menu</Typography>
        </Link>
      </Box>
    );
  }

  const toggleExtra = (extra) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  const extraItems = [
    { name: "Extra Lemon Sauce", price: 2.5 },
    { name: "Garlic Crust", price: 1.75 },
  ];

  const spiceLevels = ["Mild", "Medium", "Hot"];

  return (
    <Box
      key={id}
      sx={{
        bgcolor: "#f9f9f9",
        minHeight: "100vh",
        pt: { xs: 2, md: 4 },
        animation: "fadeInUp 0.5s ease-out forwards",
        "@keyframes fadeInUp": {
          from: { opacity: 0, transform: "translateY(15px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 4 } }}>

        {/* Breadcrumb */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 4, flexWrap: "wrap" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="caption" sx={{ color: "#046453", fontWeight: 600, "&:hover": { opacity: 0.8 } }}>
              Explore
            </Typography>
          </Link>
          <ChevronRightIcon sx={{ fontSize: 14, color: "rgba(0,0,0,0.4)" }} />
          <Typography variant="caption" sx={{ color: "rgba(0,0,0,0.5)" }}>{selectedMeal.category}</Typography>
          <ChevronRightIcon sx={{ fontSize: 14, color: "rgba(0,0,0,0.4)" }} />
          <Typography variant="caption" sx={{ color: "#046453", fontWeight: 600 }}>{selectedMeal.name}</Typography>
        </Box>

        {/* Product Hero */}
        <Grid container spacing={{ xs: 4, lg: 8 }} sx={{ mb: { xs: 6, md: 10 } }}>

          {/* Image Column */}
          <Grid item xs={12} lg={5}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  borderRadius: "2rem",
                  overflow: "hidden",
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
                  bgcolor: "#f3f3f3",
                  aspectRatio: "4/3",
                }}
              >
                <Box
                  component="img"
                  src={selectedMeal.img}
                  alt={selectedMeal.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Chip
                  label="Popular"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    bgcolor: "#b3272a",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "10px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    height: 24,
                  }}
                />
              </Box>

              {/* Chef's Badge */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -20,
                  right: { xs: -8, md: 16 },
                  bgcolor: "white",
                  p: 2,
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box sx={{ bgcolor: "#2d7d6b", color: "white", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <VerifiedIcon sx={{ fontSize: 14 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "9px", fontWeight: 800, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Chef's Choice</Typography>
                  <Typography sx={{ fontSize: "11px", fontWeight: 500, lineHeight: 1 }}>Curated Daily</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Details Column */}
          <Grid item xs={12} lg={7}>
            <Box sx={{ mt: { xs: 4, lg: 0 } }}>

              {/* Stars & Reviews */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
                {[1, 2, 3, 4].map((s) => (
                  <StarIcon key={s} sx={{ fontSize: 16, color: "#b3272a" }} />
                ))}
                <StarHalfIcon sx={{ fontSize: 16, color: "#b3272a" }} />
                <Typography variant="caption" sx={{ ml: 1, color: "rgba(0,0,0,0.5)", fontWeight: 500 }}>
                  4.8 ({selectedMeal.rate} Reviews)
                </Typography>
              </Box>

              {/* Title */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "2.5rem", xl: "3rem" },
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 900,
                  color: "#1a1c1c",
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                {selectedMeal.name}
              </Typography>

              <Typography variant="body1" sx={{ color: "rgba(0,0,0,0.55)", lineHeight: 1.7, maxWidth: "500px", mb: 3 }}>
                {selectedMeal.description}
              </Typography>

              {/* Pricing */}
              <Box
                sx={{
                  bgcolor: "#f3f3f3",
                  p: 2,
                  borderRadius: "12px",
                  mb: 4,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#046453" }}>${selectedMeal.price}</Typography>
                <Typography sx={{ color: "rgba(0,0,0,0.3)", textDecoration: "line-through", fontSize: "0.9rem" }}>
                  ${(selectedMeal.price * 1.25).toFixed(2)}
                </Typography>
                <Box sx={{ bgcolor: "rgba(179,39,42,0.1)", color: "#b3272a", px: 1, py: 0.3, borderRadius: "4px", fontSize: "10px", fontWeight: 800 }}>
                  SALE -25%
                </Box>
              </Box>

              {/* Spice Level */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)", mb: 1.5 }}>
                  Spice Intensity
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {spiceLevels.map((level) => (
                    <Button
                      key={level}
                      variant={spiceLevel === level ? "contained" : "outlined"}
                      size="small"
                      onClick={() => setSpiceLevel(level)}
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "12px",
                        bgcolor: spiceLevel === level ? "#046453" : "transparent",
                        borderColor: spiceLevel === level ? "#046453" : "#e0e0e0",
                        color: spiceLevel === level ? "white" : "rgba(0,0,0,0.7)",
                        boxShadow: spiceLevel === level ? "0 8px 20px -6px rgba(4,100,83,0.4)" : "none",
                        "&:hover": {
                          bgcolor: spiceLevel === level ? "#035a47" : "rgba(4,100,83,0.05)",
                          borderColor: "#046453",
                        },
                      }}
                    >
                      {level}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Extras */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)", mb: 1.5 }}>
                  Enhance Your Plate
                </Typography>
                <Grid container spacing={1.5}>
                  {extraItems.map((extra) => (
                    <Grid item xs={12} sm={6} key={extra.name}>
                      <Box
                        onClick={() => toggleExtra(extra.name)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          p: 1.5,
                          borderRadius: "10px",
                          border: "1.5px solid",
                          borderColor: extras.includes(extra.name) ? "#046453" : "transparent",
                          bgcolor: extras.includes(extra.name) ? "rgba(4,100,83,0.04)" : "#f3f3f3",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          "&:hover": { borderColor: "#046453" },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Checkbox
                            checked={extras.includes(extra.name)}
                            onChange={() => toggleExtra(extra.name)}
                            size="small"
                            sx={{ p: 0, color: "#046453", "&.Mui-checked": { color: "#046453" } }}
                          />
                          <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>{extra.name}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: "11px", fontWeight: 800, color: "#046453" }}>+${extra.price}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Quantity */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  bgcolor: "white",
                  borderRadius: "12px",
                  border: "1px solid #f3f3f3",
                  mb: 4,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f3f3f3", borderRadius: "10px", p: 0.5 }}>
                  <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))} sx={{ borderRadius: "8px" }}>
                    <RemoveIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <Typography sx={{ px: 2, fontWeight: 800, fontSize: "1rem", minWidth: 32, textAlign: "center" }}>{quantity}</Typography>
                  <IconButton size="small" onClick={() => setQuantity(quantity + 1)} sx={{ bgcolor: "#046453", color: "white", borderRadius: "8px", "&:hover": { bgcolor: "#035a47" } }}>
                    <AddIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", fontWeight: 500 }}>Estimate Total</Typography>
                  <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: "#046453" }}>${(selectedMeal.price * quantity).toFixed(2)}</Typography>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      bgcolor: "#046453",
                      borderRadius: "12px",
                      py: 1.8,
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "none",
                      boxShadow: "0 20px 40px -12px rgba(4,100,83,0.3)",
                      "&:hover": { bgcolor: "#035a47", opacity: 0.95 },
                      "&:active": { transform: "scale(0.98)" },
                    }}
                  >
                    Buy Now
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ShoppingBagIcon />}
                    sx={{
                      borderRadius: "12px",
                      py: 1.8,
                      fontFamily: "Plus Jakarta Sans",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "none",
                      color: "rgba(0,0,0,0.7)",
                      borderColor: "#e0e0e0",
                      bgcolor: "#e2e2e2",
                      "&:hover": { bgcolor: "#d8d8d8", borderColor: "#d8d8d8" },
                      "&:active": { transform: "scale(0.98)" },
                    }}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Recommendations */}
        <Box component="section" sx={{ mt: { xs: 8, md: 12 }, pt: { xs: 6, md: 8 }, borderTop: "1px solid #f3f3f3" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4, flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography sx={{ color: "#b3272a", fontWeight: 800, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", mb: 0.5 }}>
                The Curator Recommends
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Plus Jakarta Sans", fontWeight: 900 }}>
                You Might Also Like
              </Typography>
            </Box>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#046453" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "13px" }}>View Full Menu</Typography>
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </Box>
            </Link>
          </Box>

          <Grid container spacing={3}>
            {meals.slice(0, 3).map((meal) => (
              <Grid item xs={12} sm={6} md={4} key={meal.id}>
                <Link to={`/dish/${meal.id}`} style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      bgcolor: "white",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateY(-6px)" },
                    }}
                  >
                    <Box sx={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                      <Box
                        component="img"
                        src={meal.img}
                        alt={meal.name}
                        sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease", "&:hover": { transform: "scale(1.05)" } }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "rgba(255,255,255,0.95)",
                          backdropFilter: "blur(4px)",
                          px: 1,
                          py: 0.3,
                          borderRadius: "50px",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                      >
                        <StarIcon sx={{ fontSize: 12, color: "#b3272a" }} />
                        <Typography sx={{ fontSize: "10px", fontWeight: 800 }}>4.8</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ p: 2.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{meal.name}</Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ color: "#046453", fontWeight: 800, fontSize: "1rem" }}>${meal.price}</Typography>
                        <Box sx={{ width: 32, height: 32, borderRadius: "8px", bgcolor: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <AddIcon sx={{ fontSize: 18, color: "rgba(0,0,0,0.6)" }} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default MealDesc;
