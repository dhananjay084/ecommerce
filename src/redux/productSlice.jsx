import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    currentPage: 1,
    itemsPerPage: 8, // Set items per page
    status: null,
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.items.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.currentPage = 1; // Reset to first page on search
    },
    filterByCategory: (state, action) => {
      if (action.payload === "all") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter((product) => product.category === action.payload);
      }
      state.currentPage = 1; // Reset to first page when filtering
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSearchQuery, filterByCategory, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
