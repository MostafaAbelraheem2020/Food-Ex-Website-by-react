import React, { useState } from "react";
import { Button, Stack, Box } from "@mui/material";

function FilterBtns({
  handleBreakfast,
  handleLunch,
  handleDinner,
  handleAllDishes,
}) {
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    { label: "All Menu", icon: "menu_book", action: handleAllDishes, id: "All" },
    { label: "Breakfast", icon: "egg_alt", action: handleBreakfast, id: "Breakfast" },
    { label: "Lunch", icon: "lunch_dining", action: handleLunch, id: "Lunch" },
    { label: "Dinner", icon: "dinner_dining", action: handleDinner, id: "Dinner" },
  ];

  const handleTabClick = (category) => {
    setActiveTab(category.id);
    category.action();
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 2, md: 4, lg: 6 }, my: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          overflowX: "auto",
          pb: 1,
          justifyContent: { xs: "flex-start", md: "flex-start" },
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => handleTabClick(cat)}
            variant={activeTab === cat.id ? "contained" : "text"}
            startIcon={<span className="material-symbols-outlined text-[20px]">{cat.icon}</span>}
            sx={{
              borderRadius: "50px",
              px: 3,
              py: 1,
              whiteSpace: "nowrap",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 700,
              fontSize: { xs: "13px", sm: "14px" },
              textTransform: "none",
              bgcolor: activeTab === cat.id ? "#26816C" : "rgba(0,0,0,0.04)",
              color: activeTab === cat.id ? "white" : "rgba(0,0,0,0.6)",
              "&:hover": {
                bgcolor: activeTab === cat.id ? "#1e6656" : "rgba(38, 129, 108, 0.1)",
                color: activeTab === cat.id ? "white" : "#26816C",
              },
              transition: "all 0.3s ease",
              boxShadow: activeTab === cat.id ? "0 8px 20px -6px rgba(38, 129, 108, 0.4)" : "none",
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

export default FilterBtns;
