import React, { useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";

import MyProfile from "../components/sections/ProfileSections/MyProfile";
import Orders from "../components/sections/ProfileSections/Orders";
import Wishlist from "../components/sections/ProfileSections/Wishlist";

function Profile() {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaRegUser />, text: "My Profile", value: "profile" },
    { icon: <HiOutlineShoppingBag />, text: "Orders", value: "orders" },
    { icon: <FaRegHeart />, text: "Wishlist", value: "wishlist" },
    { icon: <TbLogout />, text: "Logout", value: "logout" },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-72 bg-white border border-gray-100 rounded-2xl shadow-lg p-4 h-fit">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                item.value === "logout"
                  ? handleLogout()
                  : setActiveSection(item.value)
              }
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition duration-200 mb-2 ${
                item.value === "logout"
                  ? "text-red-500 hover:bg-red-500 hover:text-white"
                  : activeSection === item.value
                    ? "bg-[#EDF8F1] text-emerald-600"
                    : "text-gray-600 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <h3 className="font-semibold">{item.text}</h3>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === "profile" && <MyProfile />}

          {activeSection === "orders" && <Orders />}

          {activeSection === "wishlist" && <Wishlist />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
