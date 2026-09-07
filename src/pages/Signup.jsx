import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    );

    localStorage.setItem("isLoggedIn", "true");

    alert("Account Created Successfully!");
    navigate("/profile");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-10 bg-gradient-to-br from-emerald-50 via-white to-gray-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center">Create Account</h1>
        <p className="text-gray-500 text-center mt-2">Join ShopSphere today</p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div className="relative">
            <HiOutlineUser className="absolute left-4 top-4 text-gray-400 text-xl" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="relative">
            <HiOutlineMail className="absolute left-4 top-4 text-gray-400 text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="relative">
            <HiOutlineLockClosed className="absolute left-4 top-4 text-gray-400 text-xl" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
            />
          </div>

          <div className="relative">
            <HiOutlineLockClosed className="absolute left-4 top-4 text-gray-400 text-xl" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
