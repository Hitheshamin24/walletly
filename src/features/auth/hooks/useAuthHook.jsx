import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../state/authSlice";
import { useState } from "react";
export const useAuthHook = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [walletlyUsers, setWalletlyUsers] = useState(
    () => JSON.parse(localStorage.getItem("walletly-users")) || [],
  );
  const { register, handleSubmit, reset } = useForm();
  const registerUser = (data) => {
    const userData = { ...data, fullname: data.fullname.trim() };
    const fullname = userData.fullname;
    const email = userData.email;
    const existsName = walletlyUsers.some(
      (user) => user.fullname.toLowerCase() === fullname.toLowerCase(),
    );
    const existEmail = walletlyUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
    if (existsName) {
      toast.error("User name already taken");
      return;
    }
    if (existEmail) {
      toast.error("Email already taken ");
      return;
    }
    const newUser = { id: Date.now(), ...userData };
    const updatedUsers = [...walletlyUsers, newUser];
    setWalletlyUsers(updatedUsers);
    // eslint-disable-next-line no-unused-vars
    const { password, ...safeUser } = newUser;
    dispatch(addUser(safeUser));
    localStorage.setItem("walletly-users", JSON.stringify(updatedUsers));
    localStorage.setItem("walletlyCurrentUser", JSON.stringify(newUser));
    toast.success("register successful");
    reset();
    navigate("/main");
  };

  // login authentication
  const loginUser = (data) => {
    const email = data.email.toLowerCase();
    const loggedInUser = walletlyUsers.find(
      (user) =>
        user.email.toLowerCase() === email &&
        user.password === data.password,
    );
    if (!loggedInUser) return toast.error("Invalid email or password");
    // eslint-disable-next-line no-unused-vars
    const { password, ...safeUser } = loggedInUser;
    dispatch(addUser(safeUser));
    localStorage.setItem("walletlyCurrentUser", JSON.stringify(safeUser));
    toast.success("Login successful");
    navigate("/main");
  };

  const logoutUser = () => {
    localStorage.removeItem("walletlyCurrentUser");
    dispatch(removeUser());
    navigate("/login");
  };
  const formError = (error) => {
    if (Object.keys(error).length > 1) {
      toast.warn("All fields are required ");
      return;
    }
    const firstError = Object.values(error)[0];
    if (firstError?.message) {
      toast.warn(firstError.message);
    }
  };

  return {
    register,
    handleSubmit,
    reset,
    registerUser,
    formError,
    loginUser,
    logoutUser,
    dispatch,
    isAuthenticated,
  };
};
