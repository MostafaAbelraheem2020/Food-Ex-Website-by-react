import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MyContext from "./MainDataContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// ── Styled search wrapper (used in desktop inline search) ──
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: "rgba(255,255,255,0.13)",
  border: "1px solid rgba(255,255,255,0.15)",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.18)" },
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  paddingLeft: theme.spacing(1.5),
  width: "200px",
  "&:focus-within": {
    backgroundColor: "rgba(255,255,255,0.22)",
    boxShadow: "0 0 0 3px rgba(255,255,255,0.12)",
    width: "260px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "240px",
    "&:focus-within": { width: "320px" },
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.6, 1.5, 0.6, 0.5),
    fontSize: "0.875rem",
    "&::placeholder": { color: "rgba(255,255,255,0.6)", opacity: 1 },
  },
}));

export default function AppBarComponent() {
  const {
    setIsLoggedInState,
    isLoggedInState,
    handelSearch,
    sortedMeals,
    setMeals,
    userRole,
    setUserRole,
    UserActivatyFn,
  } = useContext(MyContext);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const openAuthMenu = Boolean(anchorEl);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoggedInState(true);
        const userDocRef = doc(db, "users", currentUser.uid);
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              setUserRole(docSnapshot.data().role || "user");
            }
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } else {
        setIsLoggedInState(false);
      }
    });
    return () => unsub();
  }, [setIsLoggedInState, setUserRole]);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const handleLogout = async () => {
    if (auth.currentUser) {
      UserActivatyFn(auth.currentUser.uid, {
        "userActivety.lastLogin": new Date().toISOString(),
        "userActivety.isActive": false,
      });
    }
    await signOut(auth);
    navigate("/Login");
    handleMenuClose();
    setMobileOpen(false);
    Swal.fire({ title: "وداعاً!", text: "تم تسجيل خروجك", icon: "success", timer: 3000, showConfirmButton: false });
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Branches", path: "/Branches" },
    { label: "About", path: "/About" },
    { label: "Reviews", path: "/Reviews" },
    { label: "Contact", path: "/Contact" },
  ];

  // ── Auth menu/buttons shared between mobile & desktop ──
  const AuthSection = () =>
    isLoggedInState ? (
      <>
        <IconButton color="inherit" onClick={handleMenuOpen} size="small">
          <AccountCircleIcon sx={{ fontSize: { xs: 28, md: 30 } }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openAuthMenu} onClose={handleMenuClose} sx={{ mt: 1 }}>
          <MenuItem disabled sx={{ fontWeight: 800 }}>{user?.displayName || "User"}</MenuItem>
          {(userRole === "admin" || userRole === "owner") && (
            <MenuItem onClick={() => { navigate("/AdminDashbord"); handleMenuClose(); }}>Dashboard</MenuItem>
          )}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    ) : (
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Button
          color="inherit"
          sx={{ fontWeight: 700, textTransform: "none", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
          onClick={() => navigate("/Login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "rgba(255,255,255,0.18)",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            fontSize: "0.9rem",
            "&:hover": { bgcolor: "rgba(255,255,255,0.28)" },
            display: { xs: "none", sm: "inline-flex" },
          }}
          onClick={() => navigate("/Register")}
        >
          Register
        </Button>
      </Box>
    );

  // ── Mobile Drawer ──
  const drawer = (
    <Box sx={{ p: 2, height: "100%", bgcolor: "#f7f7f7" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#26816C" }}>Menu</Typography>
        <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton
              onClick={() => { navigate(link.path); handleDrawerToggle(); }}
              sx={{ borderRadius: "10px", mb: 1 }}
            >
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      {!isLoggedInState ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button fullWidth variant="contained" sx={{ bgcolor: "#26816C", borderRadius: "10px" }} onClick={() => { navigate("/Login"); handleDrawerToggle(); }}>Login</Button>
          <Button fullWidth variant="outlined" sx={{ color: "#26816C", borderColor: "#26816C", borderRadius: "10px" }} onClick={() => { navigate("/Register"); handleDrawerToggle(); }}>Register</Button>
        </Stack>
      ) : (
        <Button fullWidth variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#26816c", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>

        {/* ════════════════════════════════════
            Main Toolbar
        ════════════════════════════════════ */}
        <Toolbar sx={{ minHeight: { xs: 60, sm: 64, md: 70 }, px: { xs: 1.5, sm: 2, md: 4 }, position: "relative" }}>

          {/* ── Left side ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

            {/* Hamburger — mobile only */}
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ display: { xs: "flex", md: "none" } }}>
              <MenuIcon />
            </IconButton>

            {/* Logo — desktop only (left-aligned) */}
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, fontFamily: "Plus Jakarta Sans", fontSize: { md: "1.6rem", lg: "1.85rem" }, display: { xs: "none", md: "block" }, mr: 2 }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }} onClick={() => setMeals(sortedMeals)}>
                Food Ex
              </Link>
            </Typography>

            {/* Nav links — desktop only */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
              {navLinks.slice(0, 4).map((link) => (
                <Button
                  key={link.path}
                  color="inherit"
                  onClick={() => navigate(link.path)}
                  sx={{ fontWeight: 700, textTransform: "none", fontSize: "0.9rem", opacity: 0.88, "&:hover": { opacity: 1, bgcolor: "rgba(255,255,255,0.1)" }, borderRadius: "8px" }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* ── Center: Logo — MOBILE ONLY (absolutely centered) ── */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "auto",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }} onClick={() => setMeals(sortedMeals)}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, fontFamily: "Plus Jakarta Sans", color: "white", fontSize: { xs: "1.3rem", sm: "1.5rem" }, letterSpacing: "-0.5px", userSelect: "none" }}
              >
                Food Ex
              </Typography>
            </Link>
          </Box>

          {/* ── Right side ── */}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>

            {/* Search bar — DESKTOP ONLY (inline in toolbar) */}
            <Search sx={{ display: { xs: "none", md: "flex" } }}>
              <SearchIcon sx={{ color: "rgba(255,255,255,0.7)", fontSize: 18, mr: 0.5, flexShrink: 0 }} />
              <StyledInputBase
                placeholder="Search…"
                onChange={(e) => handelSearch(e.target.value)}
                inputProps={{ "aria-label": "search dishes" }}
              />
            </Search>

            <AuthSection />
          </Box>
        </Toolbar>

        {/* ════════════════════════════════════
            Search Row — MOBILE ONLY
        ════════════════════════════════════ */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            px: 2,
            py: 0.8,
            bgcolor: "rgba(0,0,0,0.1)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.13)",
              borderRadius: "50px",
              px: 2,
              py: 0.5,
              width: "100%",
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
              "&:focus-within": {
                bgcolor: "rgba(255,255,255,0.22)",
                boxShadow: "0 0 0 3px rgba(255,255,255,0.12)",
              },
            }}
          >
            <SearchIcon sx={{ color: "rgba(255,255,255,0.7)", fontSize: 18, mr: 1, flexShrink: 0 }} />
            <InputBase
              placeholder="Search for dishes, categories…"
              onChange={(e) => handelSearch(e.target.value)}
              sx={{
                color: "white",
                flex: 1,
                fontSize: "0.875rem",
                "& ::placeholder": { color: "rgba(255,255,255,0.6)", opacity: 1 },
              }}
              inputProps={{ "aria-label": "search dishes mobile" }}
            />
          </Box>
        </Box>
      </AppBar>

      {/* Responsive Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      {/*
        Spacer to push page content below the fixed AppBar:
        - Mobile:  Toolbar(60px) + Search row(~46px) ≈ 106px
        - Tablet:  Toolbar(64px) + Search row(~46px) ≈ 110px
        - Desktop: Toolbar(70px) only
      */}
      <Box sx={{ height: { xs: "106px", sm: "110px", md: "70px" } }} />
    </Box>
  );
}
