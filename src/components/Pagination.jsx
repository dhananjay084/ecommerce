import { Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/productSlice";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CustomPagination = () => {
  const dispatch = useDispatch();
  const { filteredItems, currentPage, itemsPerPage } = useSelector((state) => state.products);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  const handlePageChange = (event, page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ marginTop: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          "& .MuiPaginationItem-root": {
            color: darkMode ? "#fff" : "#000", // Change text color based on theme
            backgroundColor: darkMode ? "#333" : "#fff", // Change background
            border: darkMode ? "1px solid #555" : "1px solid #ddd",
          },
          "& .Mui-selected": {
            backgroundColor: darkMode ? "#555" : "#1976d2", // Highlight selected page
            color: darkMode ? "#fff" : "#fff",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: darkMode ? "#666" : "#eee", // Hover effect
          },
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
