import { Drawer, List, ListItem, ListItemText, Box, Tooltip } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { filterByCategory } from "../redux/productSlice";
import { FaHome, FaTshirt, FaLaptop, FaGem, FaCouch } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { ThemeContext } from "../context/ThemeContext";
import { GiEarrings } from "react-icons/gi";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [hovered, setHovered] = useState(false); // Track hover state
  const dispatch = useDispatch();
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Define icon color based on dark mode
  const iconColor = darkMode ? "#ddd" : "#000";

  // Category icons mapping (with dynamic color)
  const categoryIcons = {
    electronics: <CiMobile3 color={iconColor} />,
    jewelry: <GiEarrings color={iconColor} />,
    "men's clothing": <FaTshirt color={iconColor} />,
    "women's clothing": <FaTshirt color={iconColor} />,
    furniture: <FaCouch color={iconColor} />,
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        zIndex: 1000,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: hovered ? 240 : 60,
          transition: "width 0.3s ease-in-out",
          "& .MuiDrawer-paper": {
            width: hovered ? 240 : 60,
            transition: "width 0.3s ease-in-out",
            backgroundColor: darkMode ? "#222" : "#f4f4f4",
            boxShadow: hovered ? "3px 0px 10px rgba(0, 0, 0, 0.2)" : "none",
            borderRight: darkMode ? "2px solid #444" : "2px solid #ddd",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "20px",
          },
        }}
      >
        <List sx={{ marginTop: "85px" }}>
          <Tooltip title="All Products" placement="right" disableHoverListener={hovered}>
            <ListItem
              button
              onClick={() => dispatch(filterByCategory("all"))}
              sx={{
                transition: "all 0.3s ease-in-out",
                "&:hover": { backgroundColor: darkMode ? "#333" : "#e3f2fd" },
              }}
            >
              <FaHome style={{ marginRight: hovered ? 10 : 0, fontSize: 20, color: iconColor }} />
              {hovered && (
                <ListItemText
                  primary="All Products"
                  sx={{ color: darkMode ? "#fff" : "#000" }}
                />
              )}
            </ListItem>
          </Tooltip>

          {/* Categories */}
          {categories.map((category) => (
            <Tooltip key={category} title={category} placement="right" disableHoverListener={hovered}>
              <ListItem
                button
                onClick={() => dispatch(filterByCategory(category))}
                sx={{
                  transition: "all 0.3s ease-in-out",
                  "&:hover": { backgroundColor: darkMode ? "#333" : "#e3f2fd" },
                }}
              >
                {categoryIcons[category] || <FaTshirt color={iconColor} />} {/* Default icon */}
                {hovered && (
                  <ListItemText
                    primary={category.charAt(0).toUpperCase() + category.slice(1)}
                    sx={{ marginLeft: 1, color: darkMode ? "#fff" : "#000" }}
                  />
                )}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
