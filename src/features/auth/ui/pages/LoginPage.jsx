import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { useAuthHook } from "../../hooks/useAuthHook";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, loginUser, formError, } =
    useAuthHook();
 
  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(loginUser, formError)}
        className="w-full max-w-85 rounded-lg bg-white px-7 py-6 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img
            src="/walletlyLogo.png"
            alt="Walletly"
            className="w-11 h-11 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-[22px] font-bold text-[#123b61]">Walletly</h1>

          <p className="mt-1 text-[10px] text-gray-500">
            Your smart way to manage your finances.
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1.5 text-[10px] font-semibold text-[#123b61]">
            Email Address
          </label>

          <input
            type="email"
            {...register("email", {
              required: "email is required",
            })}
            placeholder="you@example.com"
            className="w-full h-10 rounded-md border border-gray-200 bg-[#fafbff] px-3 text-[11px] outline-none focus:border-[#008b7a]"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] font-semibold text-[#123b61]">
              Password
            </label>

            <button className="text-[9px] text-[#008b7a]">
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-8 rounded-md border border-gray-200 bg-[#fafbff] px-3 pr-9 text-[9px] outline-none focus:border-[#008b7a]"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {!showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
            </span>
          </div>
        </div>

        {/* Sign In */}
        <button className="w-full h-10 rounded-md bg-[#008b7a] text-white text-[11px] font-semibold hover:bg-[#007568] transition">
          Sign In
        </button>

        {/* Register */}
        <p className="text-center text-[9px] text-gray-500 mt-5">
          Don't have an account?{" "}
          <NavLink to={"/register"} className="font-semibold text-[#008b7a]">
            Create an account
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
