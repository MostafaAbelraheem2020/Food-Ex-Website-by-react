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
  Grid, 
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
  Stack
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MyContext from "./MainDataContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
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
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "25ch",
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
  }, [setIsLoggedInState, setUserRole]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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

    Swal.fire({
      title: "وداعاً!",
      text: "تم تسجيل خروجك",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Branches", path: "/Branches" },
    { label: "About", path: "/About" },
    { label: "Reviews", path: "/Reviews" },
    { label: "Contact", path: "/Contact" },
  ];

  const drawer = (
    <Box sx={{ p: 2, height: '100%', bgcolor: '#f7f7f7' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#26816C' }}>Menu</Typography>
        <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.path} disablePadding>
            <ListItemButton 
              onClick={() => { navigate(link.path); handleDrawerToggle(); }}
              sx={{ borderRadius: '10px', mb: 1 }}
            >
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      {!isLoggedInState ? (
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Button fullWidth variant="contained" sx={{ bgcolor: '#26816C', borderRadius: '10px' }} onClick={() => { navigate('/Login'); handleDrawerToggle(); }}>Login</Button>
          <Button fullWidth variant="outlined" sx={{ color: '#26816C', borderColor: '#26816C', borderRadius: '10px' }} onClick={() => { navigate('/Register'); handleDrawerToggle(); }}>Register</Button>
        </Stack>
      ) : (
        <Button fullWidth variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#26816c", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <Toolbar sx={{ minHeight: { xs: 64, sm: 70 }, px: { xs: 2, sm: 4 } }}>
          <Grid container alignItems="center" spacing={1} sx={{ flexWrap: "nowrap" }}>
            
            {/* Mobile Menu Icon */}
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton color="inherit" onClick={handleDrawerToggle} edge="start">
                <MenuIcon />
              </IconButton>
            </Grid>

            {/* Logo */}
            <Grid item sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, mr: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 900, 
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }
                }}
              >
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }} onClick={() => setMeals(sortedMeals)}>
                  Food Ex
                </Link>
              </Typography>
            </Grid>

            {/* Navigation Desktop */}
            <Grid item sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2 }}>
               {navLinks.slice(0, 4).map(link => (
                 <Button 
                   key={link.path} 
                   color="inherit" 
                   sx={{ fontWeight: 700, textTransform: 'none', fontSize: '0.95rem', opacity: 0.9, '&:hover': { opacity: 1 } }}
                   onClick={() => navigate(link.path)}
                 >
                   {link.label}
                 </Button>
               ))}
            </Grid>

            {/* Search Bar - Hidden on very small xs, or responsive */}
            <Grid item xs={true} sx={{ display: { xs: 'none', sm: 'flex' }, maxWidth: { md: '300px' } }}>
              <Search>
                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                <StyledInputBase 
                  placeholder="Search..." 
                  onChange={(e) => handelSearch(e.target.value)}
                />
              </Search>
            </Grid>

            {/* Auth Actions */}
            <Grid item sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
              {isLoggedInState ? (
                <>
                  <IconButton color="inherit" onClick={handleMenuOpen}>
                    <AccountCircleIcon sx={{ fontSize: 32 }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openAuthMenu}
                    onClose={handleMenuClose}
                    sx={{ mt: 1 }}
                  >
                    <MenuItem disabled sx={{ fontWeight: 800 }}>{user?.displayName || "User"}</MenuItem>
                    {(userRole === "admin" || userRole === "owner") && (
                      <MenuItem onClick={() => { navigate("/AdminDashbord"); handleMenuClose(); }}>Dashboard</MenuItem>
                    )}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                  <Button color="inherit" sx={{ fontWeight: 700 }} onClick={() => navigate("/Login")}>Login</Button>
                  <Button variant="contained" sx={{ bgcolor: 'rgba(255,255,255,0.2)', fontWeight: 700, borderRadius: '10px' }} onClick={() => navigate("/Register")}>Register</Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer to prevent content from going under fixed Appbar */}
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
    </Box>
  );
}
