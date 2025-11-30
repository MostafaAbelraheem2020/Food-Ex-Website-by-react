import * as React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext } from "react";
import MyContext from "./MainDataContext";
import { Link } from "react-router-dom";

function Dishes() {
  const { meals, toggleFavorite } = useContext(MyContext);

  if (!Array.isArray(meals) || meals.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        لا توجد أطباق متاحة حالياً
      </Typography>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        padding: "10px",
        flex: "1",
      }}
    >
      {meals.map((item, index) => {
        return (
          <Card
            key={index}
            sx={{
              width: "100%",
              marginBottom: "10px",
              backgroundColor: "#f5f5f5",
              height: "250px",
            }}
          >
            <CardHeader
              sx={{
                height: "25%",
                display: "flex",
                alignItems: "center",
                color: "gray",
                padding: "0 10px",
                justifyContent: "space-between",
              }}
              avatar={
                <Avatar
                  sx={{
                    width: "fit-content",
                    padding: "5px",
                    fontSize: "12px",
                    bgcolor: red[500],
                  }}
                >
                  {item.mealType}
                </Avatar>
              }
              action={
                <IconButton
                  sx={{
                    margin: "0",
                    padding: "15px ",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="settings"
                >
                  <MoreVertIcon
                    sx={{
                      fontSize: "30px",
                      padding: " 0 0",
                    }}
                  />
                </IconButton>
              }
              title={
                <Link
                  to={`/dish/${item.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  key={index}
                >
                  {item.name}
                </Link>
              }
              titleTypographyProps={{ fontSize: "20px" }}
            />
            <Link
              to={`/dish/${item.id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={index}
            >
              <CardMedia
                component="img"
                height="60%"
                image={item.img}
                alt={item.name}
              />
            </Link>
            <div
              style={{
                height: "15%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CardActions sx={{ padding: "0" }} disableSpacing>
                <IconButton
                  onClick={() => {
                    toggleFavorite(item.id);
                  }}
                  aria-label="add to favorites"
                >
                  <FavoriteIcon
                    sx={{
                      color: item.isFavorite ? "red" : "gray",
                    }}
                  />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Typography
                  sx={{
                    fontSize: "16px",
                    padding: "0 10px",
                    fontWeight: "bold",
                    color: "#c70000",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {item.rate + " ⭐"}
                </Typography>
              </CardActions>
              <CardContent sx={{ padding: "0 !important" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    padding: "0 10px",
                    fontWeight: "bold",
                    color: "#c70000",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {item.price + " $"}
                </Typography>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Dishes;
