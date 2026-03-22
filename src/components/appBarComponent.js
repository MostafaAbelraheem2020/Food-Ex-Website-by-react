import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MyContext from "./MainDataContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  Button, 
  Menu, 
  MenuItem, 
  Badge, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  ListItemIcon
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import InfoIcon from "@mui/icons-material/Info";
import Swal from "sweetalert2";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
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

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoggedInState(true);
        const userDocRef = doc(db, "users", currentUser.uid);
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setUserRole(userData.role || "user");
            }
          })
          .catch((error) => console.error("Error fetching user data:", error));
      } else {
        setIsLoggedInState(false);
      }
    });
    return () => unsub();
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    UserActivatyFn(auth.currentUser.uid, {
      "userActivety.lastLogin": new Date().toISOString(),
      "userActivety.isActive": false,
    });
    await signOut(auth);
    setIsLoggedInState(false);
    navigate("/Login");
    handleMenuClose();
    setMobileOpen(false);

    Swal.fire({
      title: "Goodbye!",
      text: "Successfully logged out",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const drawerContent = (
    <Box sx={{ width: 280, pt: 2 }} onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", mb: 2, color: "#26816c" }}>
        Food Ex Menu
      </Typography>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><StorefrontIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/Branches">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="Branches" />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        {isLoggedInState ? (
          <>
            <ListItem button component={Link} to="/Profile">
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/Login">
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/Register">
              <ListItemIcon><PersonAddIcon /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#26816c", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            onClick={() => setMeals(sortedMeals)}
            sx={{
              fontWeight: 900,
              color: "white",
              textDecoration: "none",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
              display: "flex",
              alignItems: "center",
              flexShrink: 0
            }}
          >
            Food Ex
          </Typography>

          {/* Search Bar - Responsive width */}
          <Search sx={{ flexGrow: { xs: 1, md: 0 }, maxWidth: { xs: "200px", sm: "400px", md: "none" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search dishes..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handelSearch(e.target.value)}
            />
          </Search>

          {/* Desktop Auth/Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            <IconButton color="inherit" component={Link} to="/Cart">
              <Badge badgeContent={2} color="error">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              {isLoggedInState ? (
                <>
                  <IconButton color="inherit" onClick={handleMenuOpen}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <MenuItem disabled sx={{ textAlign: "center", fontWeight: "bold" }}>
                      Hi, {user?.displayName || "User"}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => { handleMenuClose(); navigate("/Profile"); }}>Profile</MenuItem>
                    {(userRole === "admin" || userRole === "owner") && (
                      <MenuItem onClick={() => { handleMenuClose(); navigate("/AdminDashbord"); }}>Dashboard</MenuItem>
                    )}
                    <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate("/Login")} sx={{ fontWeight: 700 }}>Login</Button>
                  <Button variant="outlined" color="inherit" onClick={() => navigate("/Register")} 
                    sx={{ fontWeight: 700, borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "white" } }}>
                    Join
                  </Button>
                </>
              )}
            </Box>
            
            {/* Account Icon on Mobile (optional, but keep it clean) */}
            {isLoggedInState && (
              <IconButton 
                color="inherit" 
                onClick={handleMenuOpen} 
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <AccountCircleIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawerContent}
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
    </Box>
  );
}
