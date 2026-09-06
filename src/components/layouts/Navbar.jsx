import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineShoppingCart,
} from "react-icons/hi";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("focus", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("focus", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const navClass = ({ isActive }) =>
    `flex flex-col items-center cursor-pointer transition duration-200 hover:scale-110 ${
      isActive ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md mx-3 mt-5 px-6 py-3 rounded-xl shadow-xl flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <NavLink to="/">
          <img
            src={logo}
            alt="ShopSphere Logo"
            className="h-15 w-auto cursor-pointer"
          />
        </NavLink>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8 text-2xl">
        <NavLink to="/" className={navClass}>
          <HiOutlineHome />
          <span className="text-sm font-semibold">Home</span>
        </NavLink>

        <NavLink to="/products" className={navClass}>
          <HiOutlineShoppingBag />
          <span className="text-sm font-semibold">Products</span>
        </NavLink>

        <NavLink to="/contact" className={navClass}>
          <HiOutlinePhone />
          <span className="text-sm font-semibold">Contact</span>
        </NavLink>

        <NavLink to="/cart" className={navClass}>
          <div className="relative">
            <HiOutlineShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold">Cart</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <HiOutlineUser />
          <span className="text-sm font-semibold">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
