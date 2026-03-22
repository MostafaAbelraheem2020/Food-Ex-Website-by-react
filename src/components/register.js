import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Stack 
} from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: userName,
        phoneNumber: mobile,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        role: "user",
        userName: userName,
        password: password,
        phoneNumber: mobile,
        createdAt: new Date().toISOString(),
        uid: userCredential.user.uid,
        userActivety: {
          lastLogin: new Date().toISOString(),
          isActive: false,
          favorites: [],
        },
      });

      Swal.fire({
        title: " تم التسجيل بنجاح",
        text: `مرحباً ${userName}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/Login");
    } catch (error) {
      Swal.fire({
        title: "!خطأ",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#f9fafb", pt: 10, pb: 4 }}>
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: "32px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
            textAlign: "center"
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontFamily: "Plus Jakarta Sans", fontWeight: 900, mb: 1, color: "#1A2925" }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 5 }}>
            Join our culinary community today
          </Typography>

          <Box component="form" onSubmit={handleRegister}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                sx={{ 
                  "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26816C" },
                }}
              />
              <TextField
                fullWidth
                label="Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                sx={{ 
                  "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26816C" },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ 
                  "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26816C" },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ 
                  "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#26816C" },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#26816C",
                  borderRadius: "14px",
                  py: 1.8,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  mt: 2,
                  "&:hover": { bgcolor: "#1e6656" },
                  boxShadow: "0 10px 20px rgba(38, 129, 108, 0.2)"
                }}
              >
                Register
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
            Already have an account?{" "}
            <Link to="/Login" style={{ color: "#26816C", fontWeight: 700, textDecoration: "none" }}>
              Sign In
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
