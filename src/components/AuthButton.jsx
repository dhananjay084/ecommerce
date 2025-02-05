import { useDispatch, useSelector } from "react-redux";
import { auth, provider, signInWithPopup, signOut } from "../firebase/firebaseConfig";
import { login, logout } from "../redux/authSlice";
import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";

const AuthButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(login(result.user));
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = () => {
    signOut(auth);
    dispatch(logout());
  };

  return user ? (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "20px",
        textTransform: "none",
        fontWeight: "bold",
        "&:hover": { backgroundColor: "#f1f1f1" },
      }}
      onClick={signOutUser}
    >
      Logout
    </Button>
  ) : (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        alignItems: "center",
        borderRadius: "20px",
        textTransform: "none",
        fontWeight: "bold",
        padding: "6px 12px",
        "&:hover": { backgroundColor: "#f1f1f1" },
      }}
      onClick={signIn}
    >
      <FaGoogle style={{ marginRight: 8, color: "#DB4437" }} /> Login
    </Button>
  );
};

export default AuthButton;
