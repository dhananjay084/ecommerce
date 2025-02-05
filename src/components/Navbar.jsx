import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Avatar } from "@mui/material";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/productSlice";
import AuthButton from "./AuthButton"; // Google Login
import { FaSearch, FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get logged-in user
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: darkMode ? "#222" : "#1976d2",
        padding: "10px 20px",
        boxShadow: darkMode ? "0px 4px 10px rgba(255, 255, 255, 0.1)" : "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Left - Brand Name (Hidden below 550px) */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            color: "#fff",
            flexGrow: 1,
            display: { xs: "none", sm: "block" }, // Hide on small screens (below 550px)
          }}
          onClick={() => navigate("/")}
        >
          E-Commerce
        </Typography>

        {/* Center - Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: darkMode ? "#444" : "#fff",
            padding: "6px 12px",
            borderRadius: "20px",
            boxShadow: darkMode ? "0px 2px 5px rgba(255, 255, 255, 0.1)" : "0px 2px 5px rgba(0, 0, 0, 0.1)",
            width: { xs: "70%", sm: "50%", md: "40%" }, // Wider search bar
          }}
        >
          <FaSearch style={{ marginRight: 6, color: darkMode ? "#ddd" : "#666" }} />
          <InputBase
            placeholder="Search…"
            value={searchTerm}
            onChange={handleSearch}
            sx={{
              color: darkMode ? "#fff" : "#000",
              width: "100%",
              fontSize: "14px",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: "#fff" }}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </IconButton>

          <IconButton onClick={() => navigate("/cart")} sx={{ color: "#fff" }}>
            <FaShoppingCart size={20} />
          </IconButton>

          {/* User Avatar and Name */}
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={user.photoURL} alt={user.displayName} sx={{ width: 35, height: 35 }} />
              <Typography sx={{ color: "#fff", fontSize: "14px", fontWeight: "bold" }}>
                {user.displayName}
              </Typography>
            </Box>
          )}

          <AuthButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
