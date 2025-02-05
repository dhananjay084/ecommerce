import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/HomePage";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ThemeProvider from "./context/ThemeContext";
import { Box } from "@mui/material";
import { useState } from "react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Navbar />

          <Box sx={{ display: "flex", height: "100vh" }}>
            {sidebarOpen && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "240px",
                  height: "100vh",
                  zIndex: 2300, 
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => setSidebarOpen(false)} 
              />
            )}

            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                padding: "20px",
                transition: "margin 0.3s ease-in-out",
                marginLeft: sidebarOpen ? "0px" : "60px",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
