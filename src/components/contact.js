import React from "react";
import { 
  Box, 
  Grid, 
  TextField, 
  Typography, 
  Button, 
  Paper, 
  Container,
  Stack
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Contact() {
  return (
    <Box
      sx={{
        pt: 12,
        pb: 8,
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#26816C",
              fontWeight: 900,
              letterSpacing: "4px",
              mb: 1,
              display: "block",
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            We'd Love to <span style={{ color: "#26816C" }}>Hear</span> From You
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                padding: { xs: 4, md: 6 },
                borderRadius: "32px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.03)",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontFamily: "Plus Jakarta Sans", fontWeight: 800, mb: 4 }}
              >
                Send Us a Message
              </Typography>
              <Stack spacing={3}>
                <TextField 
                  label="Full Name" 
                  fullWidth 
                  variant="outlined"
                  sx={{ 
                    "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26816C" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#26816C" }
                  }}
                />
                <TextField 
                  label="Email Address" 
                  type="email" 
                  fullWidth 
                  sx={{ 
                    "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26816C" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#26816C" }
                  }}
                />
                <TextField 
                  label="Your Message" 
                  multiline 
                  rows={5} 
                  fullWidth 
                  sx={{ 
                    "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26816C" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#26816C" }
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#26816C",
                    borderRadius: "14px",
                    py: 2,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0 10px 20px rgba(38, 129, 108, 0.2)",
                    "&:hover": { bgcolor: "#1e6656" },
                  }}
                >
                  Send Message
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Contact Info & Map */}
          <Grid item xs={12} md={5}>
            <Stack spacing={4}>
              <Paper
                elevation={0}
                sx={{
                  padding: 4,
                  borderRadius: "32px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  bgcolor: "#26816C",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
                  Contact Information
                </Typography>
                <Stack spacing={3}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.1)", p: 1, borderRadius: "10px" }}>
                      <LocationOnIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, opacity: 0.9 }}>
                      Badr City, Cairo, Badr mall, 1st floor
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.1)", p: 1, borderRadius: "10px" }}>
                      <PhoneIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, opacity: 0.9 }}>
                      0100-123-4567
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Box sx={{ bgcolor: "rgba(255,255,255,0.1)", p: 1, borderRadius: "10px" }}>
                      <EmailIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, opacity: 0.9 }}>
                      info@foodex.com
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Box sx={{ borderRadius: "32px", overflow: "hidden", height: "300px", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.329732199987!2d31.715573!3d30.150707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145815b1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2z2YXYs9in2YUg2KfZhNi52KfYqSDYp9mE2YbYqNin2YTYp9iq!5e0!3m2!1sar!2seg!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
