import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { Grid, CircularProgress } from "@mui/material";
import ProductCard from "../components/ProductCard";
import CustomPagination from "../components/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const { filteredItems, status, currentPage, itemsPerPage } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (!filteredItems || filteredItems.length === 0) {
    return <h2>No products found.</h2>;
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredItems.slice(startIndex, endIndex);

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {displayedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <CustomPagination /> {/* Pagination component added */}
    </>
  );
};

export default HomePage;
