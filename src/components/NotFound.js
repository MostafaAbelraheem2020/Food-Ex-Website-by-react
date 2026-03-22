import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

function NotFound() {
  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        minHeight: "90vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      <Box 
        sx={{ 
          bgcolor: "rgba(38, 129, 108, 0.05)", 
          p: 6, 
          borderRadius: "50%", 
          mb: 4, 
          color: "#26816C" 
        }}
      >
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 120 }} />
      </Box>
      
      <Typography 
        variant="h1" 
        sx={{ 
          fontWeight: 900, 
          fontSize: { xs: "5rem", md: "8rem" }, 
          color: "#26816C", 
          mb: 0,
          fontFamily: "Plus Jakarta Sans",
          lineHeight: 1
        }}
      >
        404
      </Typography>
      
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 800, 
          mb: 2, 
          fontFamily: "Plus Jakarta Sans", 
          color: "#1a1a1a" 
        }}
      >
        Page Not Found
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          color: "rgba(0,0,0,0.6)", 
          maxWidth: "500px", 
          mb: 6,
          fontSize: "1.1rem" 
        }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        startIcon={<HomeOutlinedIcon />}
        sx={{ 
          bgcolor: "#26816C", 
          px: 6, 
          py: 2, 
          borderRadius: "16px", 
          fontWeight: 800,
          textTransform: "none",
          fontSize: "1.1rem",
          boxShadow: "0 10px 30px -10px rgba(38, 129, 108, 0.4)",
          "&:hover": {
            bgcolor: "#1e6656",
            boxShadow: "0 15px 40px -10px rgba(38, 129, 108, 0.5)"
          }
        }}
      >
        Return to Home
      </Button>
    </Container>
  );
}

export default NotFound;
