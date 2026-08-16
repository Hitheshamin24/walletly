import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../state/authSlice";
export const useAuthHook = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth.user);
  console.log(selector);
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
    dispatch(addUser(newUser));
    localStorage.setItem("walletly-users", JSON.stringify(updatedUsers));
    toast.success("register successful");
    reset();
    navigate("/main");
  };

  // login authentication
  const loginUser = (data) => {
    const userData = { ...data };
    const email = userData.email;
    const existsUser = walletlyUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
    if (!existsUser) return toast.error("user email doesn't exists");
    const loggedInUser = walletlyUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === userData.password,
    );
    if (!loggedInUser) return toast.error("Invalid email or password");
    dispatch(addUser(loggedInUser));
    localStorage.setItem("walletlyCurrentUser", JSON.stringify(loggedInUser));
    toast.success("login successful");
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

  const hydrateUser = () => {
    const user = JSON.parse(localStorage.getItem("walletlyCurrentUser")) || {};
    return user;
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
    selector,
    hydrateUser,
  };
};
