import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import Cat1 from "../../assets/Categories/Cat1.webpn";
import Cat2 from "../../assets/Categories/Cat2.webpn";
import Cat3 from "../../assets/Categories/Cat3.webpn";
import Cat4 from "../../assets/Categories/Cat4.webpn";
import Cat5 from "../../assets/Categories/Cat5.webpn";
import Cat6 from "../../assets/Categories/Cat6.webpn";
import Cat7 from "../../assets/Categories/Cat7.webpn";
import Cat8 from "../../assets/Categories/Cat8.webpn";

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
      image: Cat4,
      name: "Electronics",
      path: "/products?category=electronics",
    },
    { image: Cat5, name: "Furniture", path: "/products?category=furniture" },
    { image: Cat6, name: "Beauty", path: "/products?category=beauty" },
    {
      image: Cat7,
      name: "Accessories",
      path: "/products?category=accessories",
    },
    { image: Cat8, name: "Groceries", path: "/products?category=groceries" },

    // Remaining DummyJSON Categories
    {
      image: Cat1,
      name: "Smartphones",
      path: "/products?category=smartphones",
    },
    { image: Cat2, name: "Laptops", path: "/products?category=laptops" },
    { image: Cat3, name: "Tablets", path: "/products?category=tablets" },
    {
      image: Cat4,
      name: "Mobile Accessories",
      path: "/products?category=mobile-accessories",
    },
    {
      image: Cat5,
      name: "Men's Shirts",
      path: "/products?category=mens-shirts",
    },
    {
      image: Cat6,
      name: "Men's Watches",
      path: "/products?category=mens-watches",
    },
    {
      image: Cat7,
      name: "Women's Dresses",
      path: "/products?category=womens-dresses",
    },
    {
      image: Cat8,
      name: "Women's Bags",
      path: "/products?category=womens-bags",
    },
    {
      image: Cat1,
      name: "Women's Jewellery",
      path: "/products?category=womens-jewellery",
    },
    {
      image: Cat2,
      name: "Women's Watches",
      path: "/products?category=womens-watches",
    },
    { image: Cat3, name: "Fragrances", path: "/products?category=fragrances" },
    { image: Cat4, name: "Skin Care", path: "/products?category=skin-care" },
    {
      image: Cat5,
      name: "Sports Accessories",
      path: "/products?category=sports-accessories",
    },
    { image: Cat6, name: "Sunglasses", path: "/products?category=sunglasses" },
  ];

  return (
    <div className="mx-5">
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
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 mb-8">
        {categories.map((category, index) => (
          <NavLink key={index} to={category.path} className="group">
            <img
              src={category.image}
              alt={category.name}
              className="h-44 w-full object-contain rounded-2xl bg-[#F5F5F5] p-3 group-hover:scale-105 transition duration-300"
            />

            <p className="text-center mt-3 font-medium group-hover:text-emerald-600 transition">
              {category.name}
            </p>
          </NavLink>
        ))}
      </div>

      {/* Features */}
      <div className="bg-[#EDF8F1] rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-5 p-6">
        <div className="flex items-center gap-3">
          <MdOutlineLocalShipping className="text-4xl text-emerald-600" />
          <div>
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-xs text-gray-600">On orders above ₹2000</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <IoTimerOutline className="text-4xl text-emerald-600" />
          <div>
            <h3 className="font-semibold">Easy Return</h3>
            <p className="text-xs text-gray-600">30 days return policy</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RiSecurePaymentLine className="text-4xl text-emerald-600" />
          <div>
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-xs text-gray-600">100% secure payment</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BiSupport className="text-4xl text-emerald-600" />
          <div>
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-xs text-gray-600">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
