import { Modal, Box, Typography, Button } from "@mui/material";

const ProductDetailModal = ({ product, open, onClose }) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="product-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center", // Center content
        }}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <Typography variant="h6" id="product-modal" sx={{ fontWeight: "bold", mb: 2 }}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
          ${product.price}
        </Typography>
        <Button variant="contained" color="error" onClick={onClose} sx={{ mt: 3, borderRadius: 20 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductDetailModal;
