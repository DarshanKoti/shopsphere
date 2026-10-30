import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlinePhone,
  HiOutlineUser,
  HiOutlineShoppingCart,
} from "react-icons/hi";

import logo from "../../assets/images/logo.png";
import { countCartItems, getCart } from "../../utils/cart";
import { readJSON } from "../../utils/storage";
import { useAuth } from "../../context/AuthContext";

const navClass = ({ isActive }) =>
  `flex flex-col items-center cursor-pointer transition duration-200 hover:scale-110 ${
    isActive ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
  }`;

function Navbar() {
  const { user, isAuthenticated } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState("");

  // Account-specific cart count
  useEffect(() => {
    const updateCartCount = () => {
      if (isAuthenticated && user?.id) {
        setCartCount(countCartItems(getCart(user.id)));
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("focus", updateCartCount);
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("focus", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, [user?.id, isAuthenticated]);

  // Account-specific profile photo
  useEffect(() => {
    const updateProfilePhoto = () => {
      if (!isAuthenticated || !user?.id) {
        setProfilePhoto("");
        return;
      }

      const profile = readJSON(`profile_${user.id}`, {});
      setProfilePhoto(profile?.photo || "");
    };

    updateProfilePhoto();

    window.addEventListener("profileUpdated", updateProfilePhoto);
    window.addEventListener("storage", updateProfilePhoto);

    return () => {
      window.removeEventListener("profileUpdated", updateProfilePhoto);
      window.removeEventListener("storage", updateProfilePhoto);
    };
  }, [user?.id, isAuthenticated]);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md mx-3 mt-5 px-6 py-3 rounded-xl shadow-xl flex justify-between items-center">
      <NavLink to="/">
        <img
          src={logo}
          alt="ShopSphere Logo"
          className="h-15 w-auto cursor-pointer"
        />
      </NavLink>

      <div className="flex items-center gap-8 text-2xl">
        <NavLink to="/" className={navClass}>
          <HiOutlineHome />
          <span className="text-[5px] md:text-sm font-semibold">Home</span>
        </NavLink>

        <NavLink to="/products" className={navClass}>
          <HiOutlineShoppingBag />
          <span className="text-[5px] md:text-sm font-semibold">Products</span>
        </NavLink>

        <NavLink to="/contact" className={navClass}>
          <HiOutlinePhone />
          <span className="text-[5px] md:text-sm font-semibold">Contact</span>
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

          <span className="text-[5px] md:text-sm font-semibold">Cart</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500"
            />
          ) : (
            <HiOutlineUser />
          )}

          <span className="text-[5px] md:text-sm font-semibold">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
