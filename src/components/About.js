import * as React from "react";
import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  Container,
  Stack
} from "@mui/material";
import aboutPageImg from "../imgs/default-cover.png";
import SupFooter from "./supFooter";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", pt: 10 }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center" sx={{ minHeight: "70vh", mb: 8 }}>
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{
                color: "#26816C",
                fontWeight: 900,
                letterSpacing: "4px",
                mb: 2,
                display: "block",
              }}
            >
              Our Story
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 900,
                mb: 4,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
              }}
            >
              Crafting Culinary <br />
              <span style={{ color: "#26816C" }}>Excellence</span> Daily.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(0,0,0,0.6)",
                mb: 6,
                lineHeight: 1.8,
                fontSize: "1.1rem",
                textAlign: "justify",
                maxWidth: "540px"
              }}
            >
              مطعم فود إكس هو وجهتك المثالية للاستمتاع بتجربة طعام مصرية أصيلة مع
              لمسة عصرية. نقدم مجموعة واسعة من الأطباق المتنوعة التي تجمع بين
              النكهات التقليدية والمأكولات العالمية، لنلبي جميع الأذواق. فريقنا من
              الطهاة المحترفين يحرص على استخدام أجود المكونات الطازجة يومياً لضمان
              جودة كل طبق. سواء كنت تبحث عن وجبة إفطار شهية، غداء عائلي، أو عشاء
              فاخر، ستجد لدينا خيارات ترضي جميع أفراد العائلة. نسعى دائماً لتقديم
              أفضل خدمة في أجواء مريحة وودية، ونسعد باستقبالكم في أي وقت.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#26816C",
                    borderRadius: "15px",
                    px: 5,
                    py: 1.8,
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 10px 20px -5px rgba(38, 129, 108, 0.4)",
                    "&:hover": { bgcolor: "#1e6656" }
                  }}
                >
                  Explore Menu
                </Button>
              </Link>
              <Link to="/Contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(38, 129, 108, 0.3)",
                    color: "#26816C",
                    borderRadius: "15px",
                    px: 5,
                    py: 1.8,
                    fontWeight: 700,
                    textTransform: "none",
                    "&:hover": { borderColor: "#26816C", bgcolor: "transparent" }
                  }}
                >
                  Contact Us
                </Button>
              </Link>
            </Stack>
          </Grid>

          {/* Image Side */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: -20,
                  right: -20,
                  bottom: 20,
                  left: 20,
                  border: "2px solid #26816C",
                  borderRadius: "40px",
                  zIndex: 0,
                }
              }}
            >
              <Box
                component="img"
                src={aboutPageImg}
                alt="About Food Ex"
                sx={{
                  width: "100%",
                  height: { xs: "400px", md: "600px" },
                  objectFit: "cover",
                  borderRadius: "40px",
                  boxShadow: "0 30px 60px -15px rgba(0,0,0,0.2)",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <SupFooter />
    </Box>
  );
}
