import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Avatar,
  Stack,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const pastOrders = [
  { id: "#4582", date: "Oct 12, 2023", total: 45.99, status: "Delivered", items: 3 },
  { id: "#4531", date: "Oct 01, 2023", total: 28.50, status: "Delivered", items: 2 },
];

function Profile() {
  return (
    <Box sx={{ bgcolor: "#F9FAF7", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* User Sidebar */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                p: 4, 
                borderRadius: "32px", 
                border: "none", 
                boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                textAlign: "center" 
              }}
            >
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mx: "auto", 
                  mb: 3, 
                  bgcolor: "#26816C",
                  fontSize: "3rem",
                  fontWeight: 900,
                  fontFamily: "Plus Jakarta Sans"
                }}
              >
                MA
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.5, fontFamily: "Plus Jakarta Sans" }}>
                Mostafa Abelraheem
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                mostafa@example.com
              </Typography>
              
              <Divider sx={{ mb: 4 }} />
              
              <Stack spacing={2}>
                <Button 
                  startIcon={<LocalShippingOutlinedIcon />} 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    borderRadius: "12px", 
                    py: 1.5, 
                    fontWeight: 700, 
                    color: "#26816C", 
                    borderColor: "#26816C",
                    textTransform: "none"
                  }}
                >
                  Order History
                </Button>
                <Button 
                  startIcon={<FavoriteBorderIcon />} 
                  variant="text" 
                  fullWidth 
                  sx={{ 
                    borderRadius: "12px", 
                    py: 1.5, 
                    fontWeight: 700, 
                    color: "rgba(0,0,0,0.6)", 
                    textTransform: "none"
                  }}
                >
                  My Favorites
                </Button>
                <Button 
                  startIcon={<SettingsOutlinedIcon />} 
                  variant="text" 
                  fullWidth 
                  sx={{ 
                    borderRadius: "12px", 
                    py: 1.5, 
                    fontWeight: 700, 
                    color: "rgba(0,0,0,0.6)", 
                    textTransform: "none"
                  }}
                >
                  Settings
                </Button>
              </Stack>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
              Recent Orders
            </Typography>
            
            <Stack spacing={3}>
              {pastOrders.map((order) => (
                <Card 
                  key={order.id} 
                  sx={{ 
                    p: 4, 
                    borderRadius: "24px", 
                    border: "none", 
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" }
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>
                        Order {order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.date} • {order.items} Items
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: "#26816C" }}>
                        ${order.total.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#2E7D32" }}>
                        <CheckCircleIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption" sx={{ fontWeight: 800 }}>{order.status}</Typography>
                      </Box>
                    </Box>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        bgcolor: "rgba(0,0,0,0.05)", 
                        color: "black", 
                        borderRadius: "10px", 
                        px: 3,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.1)", boxShadow: "none" }
                      }}
                    >
                      Reorder
                    </Button>
                  </Box>
                </Card>
              ))}
              
              <Card 
                sx={{ 
                  pb: 6, 
                  pt: 6, 
                  borderRadius: "24px", 
                  border: "none", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                  textAlign: "center",
                  opacity: 0.7 
                }}
              >
                <Typography color="text.secondary">You have no more past orders.</Typography>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Profile;
