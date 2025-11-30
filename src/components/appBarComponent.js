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
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MyContext from "./MainDataContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Swal from "sweetalert2";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
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
      width: "12ch",
      "&:focus": {
        width: "20ch",
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      } else {
        setIsLoggedInState(false);
      }
    });
    return () => unsub();
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    // حفظ حالة تسجيل الدخول في localStorage
    setIsLoggedInState(true);
    // تحديث حالة تسجيل الدخول في firebase

    UserActivatyFn(auth.currentUser.uid, {
      "userActivety.lastLogin": new Date().toISOString(),
      "userActivety.isActive": false,
    });
    await signOut(auth);
    navigate("/Login");
    handleMenuClose();

    Swal.fire({
      title: " وداعاً!",
      text: "تم تسجيل خروجك",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  return (
    <Box
      sx={{
        marginBottom: { xs: "56px", sm: "64px" },
        flexGrow: 1,
        backgroundColor: "#E9E7E7",
      }}
    >
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#26816c", boxShadow: "none" }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Grid
            container
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            {/* زر القائمة الجانبية - يظهر فقط على الشاشات الصغيرة */}
            <Grid item xs="auto" sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            {/* الشعار */}
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              display={{ xs: "none", sm: "flex" }}
              sx={{
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontSize: { xs: "20px", sm: "25px", md: "30px" },
                  "&:hover": {
                    color: "hsl(183.53 68% 19.61%)",
                    textDecoration: "none",
                    fontSize: { xs: "22px", sm: "27px", md: "32px" },
                  },
                  transition: "0.3s",
                }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => setMeals(sortedMeals)}
                >
                  Food Ex
                </Link>
              </Typography>
            </Grid>

            {/* شريط البحث - يأخذ العرض الكامل على الجوال، ويضيق على الشاشات الأكبر */}
            <Grid
              item
              xs={8}
              sm={5}
              md={5}
              sx={{
                display: "flex",
                flexGrow: 1,
              }}
            >
              <Search
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                    md: "100%",
                    lg: "100%",
                    xl: "100%",
                  },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => handelSearch(e.target.value)}
                  onBlur={(e) => {
                    e.target.value = "";
                    handelSearch("");
                  }}
                  sx={{ width: { xs: "100%", sm: "100%", md: "100%" } }}
                />
              </Search>
            </Grid>

            {/* أزرار الدخول/الخروج/الحساب */}
            <Grid
              item
              xs={1}
              sm={3}
              md={3}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-end", sm: "flex-end" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {isLoggedInState ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    onClick={handleMenuOpen}
                  >
                    <AccountCircleIcon sx={{ fontSize: "32px" }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem
                      disabled
                      sx={{
                        fontSize: "16px",
                        color: "#1A2925",
                        display: "flex",
                        width: { xs: "100%", sm: "200px" },
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Typography>Welcome</Typography>
                      <Typography>
                        {user ? user.displayName : "Guest"}
                      </Typography>
                    </MenuItem>
                    {(userRole === "admin" || userRole === "owner") && (
                      <Button
                        variant="text"
                        color="inherit"
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "12px", sm: "16px" },
                          color: "#105054",
                          width: "100%",
                          textAlign: "center",
                        }}
                        onClick={() => {
                          handleMenuClose();
                          navigate("/AdminDashbord");
                        }}
                      >
                        Dashbord
                      </Button>
                    )}
                    <MenuItem
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "14px", sm: "16px" },
                        color: "#105054",
                        width: "100%",
                        textAlign: "center",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => navigate("/Login")}
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "16px" },
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => navigate("/Register")}
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "16px" },
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
