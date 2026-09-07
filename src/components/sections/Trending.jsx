import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoStarFill } from "react-icons/go";

function Trending() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((res) => res.json())
      .then((data) => {
        const trendingProducts = data.products
          .filter((product) =>
            [
              "smartphones",
              "laptops",
              "tablets",
              "mobile-accessories",
              "mens-shirts",
              "mens-shoes",
              "mens-watches",
              "womens-dresses",
              "womens-shoes",
              "womens-bags",
              "womens-jewellery",
              "womens-watches",
              "sunglasses",
              "sports-accessories",
              "fragrances",
            ].includes(product.category),
          )
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);

        setProducts(trendingProducts);
      });
  }, []);

  const addToCart = (e, product) => {
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Added to Cart");
  };

  return (
    <div className="mx-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Trending Products</h1>

        <NavLink
          to="/products"
          className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:scale-105 transition"
        >
          View All <FaArrowRightLong />
        </NavLink>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
        {products.map((product) => (
          <NavLink
            key={product.id}
            to={`/products/${product.id}`}
            className="relative border border-gray-100 rounded-2xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-44 object-cover bg-gray-100"
              />

              <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                -{Math.round(product.discountPercentage)}%
              </span>
            </div>

            <div className="p-3">
              <h3 className="font-semibold text-sm">
                {product.title.length > 22
                  ? product.title.slice(0, 20) + "..."
                  : product.title}
              </h3>

              <p className="text-xs text-gray-500 capitalize mt-1">
                {product.category.replace("-", " ")}
              </p>

              <div className="flex items-center gap-1 text-xs my-2">
                <GoStarFill className="text-yellow-400" />
                {product.rating}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold text-emerald-600">${product.price}</p>

                <button
                  onClick={(e) => addToCart(e, product)}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                >
                  <MdOutlineShoppingCart className="text-lg" />
                </button>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Trending;
