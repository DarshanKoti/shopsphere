import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("No account found. Please sign up first.");
      navigate("/signup");
      return;
    }

    if (user.email === form.email && user.password === form.password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login Successful!");
      navigate("/", { replace: true });
    } else {
      alert("Invalid email or password.");
    }
  };

  localStorage.setItem("isLoggedIn", "true");
  navigate("/");

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-10 bg-gradient-to-br from-emerald-50 via-white to-gray-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        <p className="text-gray-500 text-center mt-2">
          Login to your ShopSphere account
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
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

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
