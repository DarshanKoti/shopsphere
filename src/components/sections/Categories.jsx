import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import Cat1 from "../../assets/Categories/Cat1.webp";
import Cat2 from "../../assets/Categories/Cat2.webp";
import Cat3 from "../../assets/Categories/Cat3.webp";
import Cat4 from "../../assets/Categories/Cat4.webp";
import Cat5 from "../../assets/Categories/Cat5.webp";
import Cat6 from "../../assets/Categories/Cat6.webp";
import Cat7 from "../../assets/Categories/Cat7.webp";
import Cat8 from "../../assets/Categories/Cat8.webp";

// Icons
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

function Categories() {
  const categories = [
    { image: Cat1, name: "Men", path: "/products?category=men" },
    { image: Cat2, name: "Women", path: "/products?category=women" },
    { image: Cat3, name: "Shoes", path: "/products?category=footwear" },
    {
      image: Cat7,
      name: "Watches",
      path: "/products?category=watches",
    },
    { image: Cat5, name: "Beauty", path: "/products?category=beauty" },
    {
      image: Cat6,
      name: "Electronics",
      path: "/products?category=electronics",
    },

    { image: Cat8, name: "Groceries", path: "/products?category=groceries" },
    { image: Cat4, name: "Furniture", path: "/products?category=furniture" },
  ];

  return (
    <div className="m-5 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Shop by Category</h1>

        <NavLink
          to="/products"
          className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:scale-105 transition"
        >
          View All <FaArrowRightLong />
        </NavLink>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {categories.map((category, index) => (
          <NavLink key={index} to={category.path} className="group">
            <img
              src={category.image}
              alt={category.name}
              className="h-60 w-full object-contain rounded-2xl bg-[#F0F0F1] p-2 group-hover:scale-105 transition duration-300"
            />

            <p className="text-center py-2 text-md group-hover:text-emerald-600 transition">
              {category.name}
            </p>
          </NavLink>
        ))}
      </div>

      {/* Features */}
      <div className="h-40 md:h-25 md:pl-5 bg-[#EDF4EE] rounded-xl my-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center justify-center">
          <MdOutlineLocalShipping className="text-[#5AA973] text-4xl" />
          <div className="mx-3">
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm">On orders above ₹2000</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <IoTimerOutline className="text-[#5AA973] text-4xl" />
          <div className="mx-3">
            <h3 className="font-semibold">Easy Return</h3>
            <p className="text-sm">30 days return policy</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <RiSecurePaymentLine className="text-[#5AA973] text-4xl" />
          <div className="mx-3">
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-sm">100% secure payment</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <BiSupport className="text-[#5AA973] text-4xl" />
          <div className="mx-3">
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-sm">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
