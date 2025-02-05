import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from "@mui/material";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Shopping Cart 🛒
      </Typography>

      {items.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <ListItem key={item.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemText primary={item.title} secondary={`Price: $${item.price} | Quantity: ${item.quantity}`} />
                <Button variant="contained" color="secondary" onClick={() => dispatch(removeFromCart(item))}>
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total Items: {totalQuantity}</Typography>
          <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
          <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartPage;
