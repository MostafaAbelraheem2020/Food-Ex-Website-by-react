import { Button, Stack, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function MAinBTnsComponents() {
  const location = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Branches", path: "/Branches" },
    { label: "About", path: "/About" },
    { label: "Reviews", path: "/Reviews" },
  ];

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 4, lg: 6 }, py: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ flexWrap: "wrap" }}
      >
        {navLinks.map((link, index) => (
          <Stack key={link.path} direction="row" alignItems="center" spacing={1}>
            <Link to={link.path} style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                sx={{
                  color: location.pathname === link.path ? "#26816C" : "rgba(0,0,0,0.5)",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 700,
                  fontSize: { xs: "11px", sm: "13px" },
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  p: 1,
                  minWidth: "auto",
                  "&:hover": {
                    color: "#26816C",
                    bgcolor: "transparent",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {link.label}
              </Button>
            </Link>
            {index < navLinks.length - 1 && (
              <Typography sx={{ color: "rgba(0,0,0,0.2)", fontSize: "14px", mt: -0.5 }}>/</Typography>
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default MAinBTnsComponents;
