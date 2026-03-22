import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import MyContext from "./MainDataContext";
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

export default function Login() {
  const { setIsLoggedInState, UserActivatyFn } = React.useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "أهلاً بك!",
        text: "تم تسجيل دخولك بنجاح",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedInState(true);
      UserActivatyFn(auth.currentUser.uid, {
        "userActivety.lastLogin": new Date().toISOString(),
        "userActivety.isActive": false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "!خطأ",
        text: error.message,
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      setEmail("");
      setPassword("");
      setIsLoggedInState(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#f9fafb", pt: 10 }}>
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
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 5 }}>
            Please enter your details to sign in
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                variant="outlined"
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
                variant="outlined"
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
                Sign In
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
            Don't have an account?{" "}
            <Link to="/Register" style={{ color: "#26816C", fontWeight: 700, textDecoration: "none" }}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
