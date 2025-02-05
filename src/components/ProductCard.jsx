import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useState } from "react";
import ProductDetailModal from "./ProductModal";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent modal opening on button click
        dispatch(addToCart(product));
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3, // Rounded corners
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                    transform: "scale(1.03)", // Slight hover effect
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Stronger shadow on hover
                },
            }}
            onClick={() => setOpen(true)}
        >
            <Box
                sx={{
                    height: 200, // Fixed height for images
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f9f9f9", // Light background to make images stand out
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                }}
            >
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain", // Ensures equal height without distortion
                        cursor: "pointer",
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}>
                    {product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
                    ${product.price}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddToCart}
                    sx={{ borderRadius: 20, fontWeight: "bold", textTransform: "none" }}
                >
                    Add to Cart
                </Button>
            </CardContent>

            {/* Product Detail Modal */}
            <ProductDetailModal product={product} open={open} onClose={() => setOpen(false)} />
        </Card>
    );
};

export default ProductCard;
