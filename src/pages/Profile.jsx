import { useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

import MyProfile from "../components/sections/ProfileSections/MyProfile";
import Orders from "./Orders";
import Wishlist from "../components/sections/ProfileSections/Wishlist";

const MENU_ITEMS = [
  { icon: <FaRegUser />, text: "My Profile", value: "profile" },
  { icon: <HiOutlineShoppingBag />, text: "Orders", value: "orders" },
  { icon: <FaRegHeart />, text: "Wishlist", value: "wishlist" },
];

const menuItemClass = (active) =>
  `flex w-full items-center gap-3 p-3 rounded-xl cursor-pointer transition duration-200 mb-2 text-left ${
    active
      ? "bg-[#EDF8F1] text-emerald-600"
      : "text-gray-600 hover:bg-emerald-600 hover:text-white"
  }`;

function Profile() {
  const [activeSection, setActiveSection] = useState("profile");
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-72 bg-white border border-gray-100 rounded-2xl shadow-lg p-4 h-fit">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setActiveSection(item.value)}
              className={menuItemClass(activeSection === item.value)}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-semibold">{item.text}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 p-3 rounded-xl cursor-pointer transition duration-200 text-left text-red-500 hover:bg-red-500 hover:text-white"
          >
            <span className="text-lg">
              <TbLogout />
            </span>
            <span className="font-semibold">Logout</span>
          </button>
        </div>

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
