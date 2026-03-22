import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  Card,
  Divider,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useNavigate } from "react-router-dom";

// Mock Cart Data
const initialCartItems = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    price: 12.99,
    quantity: 2,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Grilled Chicken Salad",
    price: 15.5,
    quantity: 1,
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200",
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 100, color: "rgba(0,0,0,0.1)", mb: 3 }} />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontFamily: "Plus Jakarta Sans" }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
          Looks like you haven't added any delicious meals yet.
        </Typography>
        <Button 
          component={Link} 
          to="/" 
          variant="contained" 
          sx={{ bgcolor: "#26816C", px: 4, py: 1.5, borderRadius: "14px", fontWeight: 700 }}
        >
          Explore Menu
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#F9FAF7", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Button 
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 14 }} />} 
          component={Link} 
          to="/"
          sx={{ color: "black", fontWeight: 700, mb: 4, textTransform: "none" }}
        >
          Back to Menu
        </Button>

        <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, fontFamily: "Plus Jakarta Sans", color: "#1a1a1a" }}>
          Shopping Cart
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              {cartItems.map((item) => (
                <Card 
                  key={item.id} 
                  sx={{ 
                    p: 2, 
                    borderRadius: "24px", 
                    border: "none", 
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)" 
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4} sm={2}>
                      <Box 
                        component="img" 
                        src={item.img} 
                        sx={{ width: "100%", borderRadius: "16px", aspectRatio: "1/1", objectFit: "cover" }} 
                      />
                    </Grid>
                    <Grid item xs={8} sm={4}>
                      <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#26816C", fontWeight: 800 }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box 
                        sx={{ 
                          display: "inline-flex", 
                          alignItems: "center", 
                          bgcolor: "#F3F4F0", 
                          borderRadius: "12px",
                          p: 0.5
                        }}
                      >
                        <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 2, fontWeight: 700 }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3} sx={{ textAlign: "right" }}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton color="error" onClick={() => removeItem(item.id)}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ p: 4, borderRadius: "32px", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Order Summary
              </Typography>
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography sx={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography sx={{ fontWeight: 700 }}>${shipping.toFixed(2)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: "#26816C" }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                sx={{ 
                  bgcolor: "#26816C", 
                  color: "white", 
                  py: 2, 
                  borderRadius: "16px", 
                  fontWeight: 800,
                  fontSize: "1rem",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#1e6656" }
                }}
                onClick={() => navigate("/Checkout")}
              >
                Go to Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Cart;
