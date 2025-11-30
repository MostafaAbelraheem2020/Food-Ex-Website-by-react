import React from "react";

// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Dishes from "./Dishes";
import Box from "@mui/material/Box";
import MyContext from "./MainDataContext";
import { useContext } from "react";
import Typography from "@mui/material/Typography";

function Content() {
  const { setMeals, sortedMeals } = useContext(MyContext); // استخدام البيانات من السياق

  return (
    <Grid sx={{ margin: "0" }} container spacing={2}>
      {/* العمود الأيسر */}
      <Grid
        sx={{
          padding: "2px 5px",
          borderRight: "1px solid #eee",
          borderLeft: "1px solid #eee",
          maxHeight: "100vh",
          overflowY: "auto",
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
          flexDirection: "column",
          gap: "5px",
        }}
        item
        xs={4}
        sm={4}
        md={3}
        lg={3}
        xl={3}
      >
        <Button
          variant="contained"
          onClick={() => {
            setMeals(sortedMeals);
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
                setMeals([meal]);
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
          display: "flex",
        }}
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
      >
        <Dishes /> {/* تغيير images إلى meal */}
      </Grid>

      {/* العمود الأيمن */}
      <Grid
        sx={{
          padding: "2px 5px",
          borderRight: "1px solid #eee",
          borderLeft: "1px solid #eee",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
        }}
        item
        xs={0}
        sm={0}
        md={3}
        lg={3}
        xl={3}
      >
        <Box mt={3}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.329732199987!2d31.715573!3d30.150707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815b1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2z2YXYs9in2YUg2KfZhNi52KfYqSDYp9mE2YbYqNin2YTYp9iq!5e0!3m2!1sar!2seg!4v1700000000000"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
        <Typography
          sx={{
            backgroundColor: "#DDD",
            width: "100%",
            height: "50%",
            textAlign: "center",
            padding: "10px",
            fontSize: "20px",
            alignItems: "center",
          }}
        >
          Ads
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Content;
