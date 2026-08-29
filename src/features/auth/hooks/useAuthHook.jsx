import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../state/authSlice";

// Single source of truth — always read users fresh from localStorage
const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("walletly-users")) || [];
  } catch {
    return [];
  }
};

export const useAuthHook = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const registerUser = (data) => {
    const userData = { ...data, fullname: data.fullname.trim() };
    const { fullname, email } = userData;
    const users = getUsers();

    const existsName = users.some(
      (user) => user.fullname.toLowerCase() === fullname.toLowerCase(),
    );
    const existEmail = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (existsName) return toast.error("User name already taken");
    if (existEmail) return toast.error("Email already taken");

    const newUser = { id: Date.now(), ...userData };
    const updatedUsers = [...users, newUser];

    // eslint-disable-next-line no-unused-vars
    const { password, ...safeUser } = newUser;
    dispatch(addUser(safeUser));
    localStorage.setItem("walletly-users", JSON.stringify(updatedUsers));
    localStorage.setItem("walletlyCurrentUser", JSON.stringify(newUser));
    toast.success("Register successful");
    reset();
    navigate("/main");
  };

  const loginUser = (data) => {
    const email = data.email.toLowerCase();
    const users = getUsers();
    const loggedInUser = users.find(
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
      toast.warn("All fields are required");
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

