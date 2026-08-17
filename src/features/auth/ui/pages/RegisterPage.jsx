import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { useAuthHook } from "../../hooks/useAuthHook";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, registerUser, formError, handleSubmit } = useAuthHook();

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(registerUser, formError)}
        className="w-full max-w-85 rounded-lg bg-white px-7 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.12)]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-1">
          <img
            src="/walletlyLog.png"
            alt="Walletly"
            className="w-11 h-11 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-[19px] font-bold text-[#008b7a]">
            Create Account
          </h1>

          <p className="mt-1 text-[9px] leading-3 text-gray-500">
            Join Walletly and take control of your finances
            <br />
            today.
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-3">
          <label className="block mb-1 text-[9px] font-semibold text-[#123b61]">
            Full Name
          </label>

          <input
            {...register("fullname", {
              required: "Full Name is required",
            })}
            type="text"
            placeholder="John Doe"
            className="w-full h-8 rounded-md border border-gray-200 bg-[#fafbff] px-3 text-[9px] outline-none focus:border-[#008b7a]"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-1 text-[9px] font-semibold text-[#123b61]">
            Email Address
          </label>

          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            placeholder="you@example.com"
            className="w-full h-8 rounded-md border border-gray-200 bg-[#fafbff] px-3 text-[9px] outline-none focus:border-[#008b7a]"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-[9px] font-semibold text-[#123b61]">
            Password
          </label>

          <div className="relative">
            <input
              {...register("password", {
                required: "password is required",
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

        {/* Create Account */}
        <button
          type="submit"
          className="w-full h-8 rounded-md bg-[#008b7a] text-white text-[9px] font-semibold hover:bg-[#007568] transition"
        >
          Create Account →
        </button>

        {/* Login */}
        <p className="text-center text-[8px] text-gray-500 mt-4">
          Already have an account?{" "}
          <NavLink to={"/login"} className="font-semibold text-[#008b7a]">
            Log in
          </NavLink>
        </p>
      </form>

      {/* Footer */}
      <div className="absolute bottom-1 left-0 right-0 text-center">
        <span className="text-[7px] text-gray-400">© 2026 Walletly</span>

        <span className="mx-2 text-[7px] text-gray-300">•</span>

        <span className="text-[7px] text-gray-400">Privacy</span>

        <span className="mx-2 text-[7px] text-gray-300">•</span>

        <span className="text-[7px] text-gray-400">24/7 Support</span>
      </div>
    </div>
  );
};

export default RegisterPage;
