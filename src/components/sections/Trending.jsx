import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

function Trending() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=25&limit=6")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (e, product) => {
    e.preventDefault(); // card navigation stop

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
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
        {products.map((product) => {
          const rating = (3.5 + (product.id % 15) / 10).toFixed(1);
          const reviewCount = ((product.id * 13) % 500) + 50;

          return (
            <NavLink
              key={product.id}
              to={`/products/${product.id}`}
              className="relative border border-gray-100 rounded-2xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-44 object-cover bg-gray-100"
              />

              <div className="p-3">
                <h3 className="font-semibold text-sm">
                  {product.title.length > 22
                    ? product.title.slice(0, 20) + "..."
                    : product.title}
                </h3>

                <p className="text-xs text-gray-500 mb-1">
                  {product.category?.name}
                </p>

                <p className="text-xs mb-2">
                  ⭐ {rating} ({reviewCount})
                </p>

                <div className="flex justify-between items-center">
                  <p className="font-bold text-emerald-600">
                    ${product.price}.00
                  </p>

                  <button
                    onClick={(e) => addToCart(e, product)}
                    className="bg-gray-100 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                  >
                    <MdOutlineShoppingCart className="text-lg" />
                  </button>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Trending;
