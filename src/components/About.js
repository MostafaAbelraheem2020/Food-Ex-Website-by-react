import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import aboutPageImg from "../imgs/default-cover.png";
import SupFooter from "./supFooter";
//testing react router link
import { Link } from "react-router-dom";
export default function About() {
  return (
    <Card sx={{ minWidth: "100%", height: "calc(100vh - 74px )" }}>
      <CardMedia
        sx={{ height: 140 }}
        image={aboutPageImg}
        title="green iguana"
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Typography gutterBottom variant="h3" component="div" fontWeight="bold">
          About
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
            textAlign: "justify",
            fontWeight: "bold",
            ml: "20px",
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
      </CardContent>
      <CardActions sx={{ alignItems: "center" }}>
        <Link to="/">
          <Button variant="contained">Menu</Button>
        </Link>
        <Link to="/Contact">
          <Button variant="outlined">Contact Us</Button>
        </Link>
      </CardActions>
      <SupFooter />
    </Card>
  );
}
