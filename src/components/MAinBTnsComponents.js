import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

function MAinBTnsComponents() {
  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "5px ", sm: "5px 20px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexWrap: "noWrap",
        gap: { xs: 0, sm: 2 },
        fontSize: { xs: "8px", sm: "16px" },
      }}
    >
      <Link to="/Home" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            fontSize: { xs: 12, sm: 16 },
            "&:hover": {
              color: "hsl(183.53 68% 19.61%)",
              textDecoration: "none",
            },
            transition: "0.3s",
          }}
          color="primary"
        >
          Home
        </Button>
      </Link>
      <span style={{ color: "blueviolet" }}>/</span>
      <Link to="/Branches" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            fontSize: { xs: 12, sm: 16 },
            "&:hover": {
              color: "hsl(183.53 68% 19.61%)",
              textDecoration: "none",
            },
            transition: "0.3s",
          }}
          color="primary"
        >
          Branches
        </Button>
      </Link>
      <span style={{ color: "blueviolet" }}>/</span>
      <Link to="/About" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            fontSize: { xs: 12, sm: 16 },
            "&:hover": {
              color: "hsl(183.53 68% 19.61%)",
              textDecoration: "none",
            },
            transition: "0.3s",
          }}
          color="primary"
        >
          About
        </Button>
      </Link>
      <span style={{ color: "blueviolet" }}>/</span>
      <Link to="/Reviews" style={{ textDecoration: "none" }}>
        <Button
          sx={{
            fontSize: { xs: 12, sm: 16 },
            "&:hover": {
              color: "hsl(183.53 68% 19.61%)",
              textDecoration: "none",
            },
            transition: "0.3s",
          }}
          color="primary"
        >
          Reviews
        </Button>
      </Link>
    </Box>
  );
}

export default MAinBTnsComponents;
