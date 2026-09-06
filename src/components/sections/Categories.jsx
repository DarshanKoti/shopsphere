import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Cat1 from "../../assets/Categories/Cat1.png";
import Cat2 from "../../assets/Categories/Cat2.png";
import Cat3 from "../../assets/Categories/Cat3.png";
import Cat4 from "../../assets/Categories/Cat4.png";
import Cat5 from "../../assets/Categories/Cat5.png";
import Cat6 from "../../assets/Categories/Cat6.png";
import Cat7 from "../../assets/Categories/Cat7.png";
import Cat8 from "../../assets/Categories/Cat8.png";

// icons
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

function Categories() {
  const CategoriesImages = [
    { image: Cat1, name: "Men", path: "/products?category=1" },
    { image: Cat2, name: "Women", path: "/products?category=1" },
    { image: Cat3, name: "Shoes", path: "/products?category=4" },
    { image: Cat4, name: "Bags", path: "/products?category=1" },
    { image: Cat5, name: "Sunglasses", path: "/products?category=1" },
    { image: Cat6, name: "Watches", path: "/products?category=1" },
    { image: Cat7, name: "Headphones", path: "/products?category=2" },
    { image: Cat8, name: "Hoodie", path: "/products?category=1" },
  ];

  return (
    <div className="m-5 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold m-5">Shop by Category</h1>
        <NavLink
          to="/Categories"
          className="text-emerald-600 font-semibold text-sm mt-5 flex items-center gap-1 cursor-pointer hover:scale-110 duration-200 transition ease-in-out"
        >
          View All <FaArrowRightLong className="font-bold" />
        </NavLink>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {CategoriesImages.map((category, index) => (
          <NavLink key={index} to={category.path}>
            <img
              src={category.image}
              alt={`Categories ${index + 1} `}
              className="h-50 w-40 object-contain rounded-2xl cursor-pointer bg-[#F0F0F1] p-2 hover:scale-105 transition duration-300"
            />
            <p className="text-center py-2 text-md cursor-pointer">
              {category.name}
            </p>
          </NavLink>
        ))}
      </div>

      <div className="h-25 bg-[#EDF4EE] rounded-xl my-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center justify-center">
          <MdOutlineLocalShipping className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm">On all order above ₹2000</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <IoTimerOutline className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">Easy Return</h3>
            <p className="text-sm">30 days return policy</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <RiSecurePaymentLine className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-sm">100% secure payment</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <BiSupport className="text-[#5AA973] text-4xl" />
          <div className="flex flex-col items-start mx-3">
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-sm">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
