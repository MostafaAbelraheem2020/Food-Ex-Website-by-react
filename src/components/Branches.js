import React from "react";
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Divider,
  Chip
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MapIcon from "@mui/icons-material/Map";

const branches = [
  {
    id: 1,
    name: "Main Branch - Maadi",
    address: "Street 9, Maadi, Cairo",
    phone: "+20 123 456 789",
    hours: "10:00 AM - 02:00 AM",
    status: "Open Now",
    mapUrl: "https://goo.gl/maps/example1"
  },
  {
    id: 2,
    name: "Downtown Branch",
    address: "Tahrir Square, Cairo",
    phone: "+20 123 456 780",
    hours: "09:00 AM - Midnight",
    status: "Open Now",
    mapUrl: "https://goo.gl/maps/example2"
  },
  {
    id: 3,
    name: "New Cairo Branch",
    address: "Fifth Settlement, Cairo",
    phone: "+20 123 456 781",
    hours: "11:00 AM - 03:00 AM",
    status: "Opening Soon",
    mapUrl: "https://goo.gl/maps/example3"
  },
  {
    id: 4,
    name: "Alexandria Branch",
    address: "Gleem Bay, Alexandria",
    phone: "+20 123 456 782",
    hours: "10:00 AM - 01:00 AM",
    status: "Open Now",
    mapUrl: "https://goo.gl/maps/example4"
  }
];

function Branches() {
  return (
    <Box sx={{ bgcolor: "#F9FAF7", minHeight: "90vh", py: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontFamily: "Plus Jakarta Sans", 
              fontWeight: 900, 
              color: "#26816C",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              mb: 2
            }}
          >
            Our Branches
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "rgba(0,0,0,0.6)", 
              maxWidth: "600px", 
              mx: "auto",
              fontSize: "1.1rem"
            }}
          >
            Visit us at your nearest location and experience the true taste of Food Ex excellence.
          </Typography>
        </Box>

        {/* Branches Grid */}
        <Grid container spacing={4}>
          {branches.map((branch) => (
            <Grid item xs={12} sm={6} md={6} key={branch.id}>
              <Card 
                sx={{ 
                  borderRadius: "24px",
                  border: "none",
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 50px -12px rgba(0,0,0,0.1)"
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        color: "#1a1a1a",
                        fontFamily: "Plus Jakarta Sans"
                      }}
                    >
                      {branch.name}
                    </Typography>
                    <Chip 
                      label={branch.status} 
                      size="small"
                      sx={{ 
                        bgcolor: branch.status === "Open Now" ? "#e6f4f1" : "#fff4e5",
                        color: branch.status === "Open Now" ? "#26816C" : "#ed6c02",
                        fontWeight: 700,
                        borderRadius: "8px"
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <LocationOnIcon sx={{ color: "#26816C", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", fontWeight: 500 }}>
                        {branch.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <PhoneIcon sx={{ color: "#26816C", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", fontWeight: 500 }}>
                        {branch.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <AccessTimeIcon sx={{ color: "#26816C", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "rgba(0,0,0,0.7)", fontWeight: 500 }}>
                        {branch.hours}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3, opacity: 0.5 }} />

                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<MapIcon />}
                    sx={{ 
                      borderRadius: "12px",
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 700,
                      color: "#26816C",
                      borderColor: "#26816C",
                      "&:hover": {
                        bgcolor: "#26816C",
                        color: "white",
                        borderColor: "#26816C"
                      }
                    }}
                    onClick={() => window.open(branch.mapUrl, "_blank")}
                  >
                    View on Maps
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Branches;
