import React from "react";
import { Box, Grid, TextField, Typography, Button, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function Contact() {
  return (
    <Box
      sx={{
        padding: { xs: 2, md: 8 },
        backgroundColor: "#fdfdfd",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        تواصل معنا
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        نحن هنا لخدمتك! لا تتردد في مراسلتنا أو زيارتنا في أي وقت.
      </Typography>

      <Grid container spacing={4} mt={2}>
        {/* نموذج التواصل */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              نموذج التواصل
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField label="الاسم" fullWidth />
              <TextField label="البريد الإلكتروني" type="email" fullWidth />
              <TextField label="رسالتك" multiline rows={4} fullWidth />
              <Button variant="contained" color="primary">
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* معلومات التواصل */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom>
              معلومات التواصل
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <LocationOnIcon color="action" />
              <Typography>
                Badr City, Cairo, Badr mall, 1st floor, 2nd branch
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon color="action" />
              <Typography>0100-123-4567</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon color="action" />
              <Typography>info@restaurant.com</Typography>
            </Box>
            {/* خريطة Google (اختياري) */}
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
