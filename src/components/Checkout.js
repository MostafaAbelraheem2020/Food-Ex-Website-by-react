import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
//  FormLabel,
  Divider,
  Stack,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { Link, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <Box sx={{ bgcolor: "#F9FAF7", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, fontFamily: "Plus Jakarta Sans", color: "#1a1a1a" }}>
          Checkout
        </Typography>

        <Grid container spacing={4}>
          {/* Shipping & Payment Info */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={4}>
              {/* Shipping Address */}
              <Card sx={{ p: 4, borderRadius: "24px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                  <Box sx={{ bgcolor: "#F3F4F0", p: 1.5, borderRadius: "12px", color: "#26816C" }}>
                    <LocationOnOutlinedIcon />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>
                    Delivery Address
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="First Name" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Last Name" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Street Address" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="City" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Phone Number" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                  </Grid>
                </Grid>
              </Card>

              {/* Payment Method */}
              <Card sx={{ p: 4, borderRadius: "24px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                  <Box sx={{ bgcolor: "#F3F4F0", p: 1.5, borderRadius: "12px", color: "#26816C" }}>
                    <CreditCardIcon />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "Plus Jakarta Sans" }}>
                    Payment Method
                  </Typography>
                </Box>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        mb: 2, 
                        p: 1, 
                        borderRadius: "16px", 
                        borderColor: paymentMethod === "card" ? "#26816C" : "#eee" 
                      }}
                    >
                      <FormControlLabel 
                        value="card" 
                        control={<Radio sx={{ color: "#26816C", '&.Mui-checked': { color: "#26816C" } }} />} 
                        label={<Typography sx={{ fontWeight: 700 }}>Credit / Debit Card</Typography>} 
                        sx={{ width: "100%", m: 0 }}
                      />
                    </Card>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        p: 1, 
                        borderRadius: "16px", 
                        borderColor: paymentMethod === "cash" ? "#26816C" : "#eee" 
                      }}
                    >
                      <FormControlLabel 
                        value="cash" 
                        control={<Radio sx={{ color: "#26816C", '&.Mui-checked': { color: "#26816C" } }} />} 
                        label={<Typography sx={{ fontWeight: 700 }}>Cash on Delivery</Typography>} 
                        sx={{ width: "100%", m: 0 }}
                      />
                    </Card>
                  </RadioGroup>
                </FormControl>
              </Card>
            </Stack>
          </Grid>

          {/* Order Summary Summary */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ p: 4, borderRadius: "32px", border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, fontFamily: "Plus Jakarta Sans" }}>
                Order Summary
              </Typography>
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Item Total</Typography>
                  <Typography sx={{ fontWeight: 700 }}>$41.48</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography color="text.secondary">Delivery Fee</Typography>
                  <Typography sx={{ fontWeight: 700 }}>$5.00</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" sx={{ fontWeight: 900 }}>Total Payable</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: "#26816C" }}>$46.48</Typography>
                </Box>
              </Stack>
              
              <Box sx={{ bgcolor: "#f8fdfb", p: 2, borderRadius: "16px", mb: 4, display: "flex", gap: 2 }}>
                <LocalShippingOutlinedIcon sx={{ color: "#26816C" }} />
                <Typography variant="body2" sx={{ color: "#26816C", fontWeight: 700 }}>
                  Estimated delivery time: 30 - 45 mins
                </Typography>
              </Box>

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
                  fontSize: "1.1rem",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#1e6656" }
                }}
                onClick={() => {
                  alert("Order Placed Successfully!");
                  navigate("/");
                }}
              >
                Place Order
              </Button>
              <Button 
                component={Link} 
                to="/Cart" 
                fullWidth 
                sx={{ mt: 2, color: "text.secondary", fontWeight: 700, textTransform: "none" }}
              >
                Return to Cart
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Checkout;
