import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SupFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 4,
        mt: "auto",
        backgroundColor: "dimgray",
        color: "white",
        textAlign: "center",
        height: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,

        width: "100%",
      }}
    >
      <div>
        {" "}
        <Link to="/">
          <Button sx={{ color: "white" }}>Home</Button>
        </Link>{" "}
        <Link to="/Branches">
          <Button sx={{ color: "white" }}>Branches</Button>{" "}
        </Link>{" "}
        <Link to="/Contact">
          <Button sx={{ color: "white" }}>Contact</Button>{" "}
        </Link>{" "}
        <Link to="/Reviews">
          <Button sx={{ color: "white" }}>Reviews</Button>
        </Link>{" "}
      </div>
      <Typography variant="body2">
        Food Ex © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default SupFooter;
