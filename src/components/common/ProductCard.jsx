import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { GoStarFill } from "react-icons/go";
import { NavLink } from "react-router-dom";

function ProductCard({ product, liked, likedProducts, setLikedProducts }) {
  const rating = (3.5 + (product.id % 15) / 10).toFixed(1);
  const reviewCount = ((product.id * 13) % 100) + 20;

  const toggleLike = () => {
    setLikedProducts((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  const addToCart = () => {
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
    <NavLink to={`/products/${product.id}`}>
      <div className="relative border-2 border-gray-100 flex flex-col items-center rounded-lg hover:scale-105 transition duration-200 ease-in-out shadow-2xl">
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow text-xl cursor-pointer hover:scale-110 transition"
        >
          {liked ? (
            <HiHeart className="text-red-400" />
          ) : (
            <HiOutlineHeart className="text-gray-500 hover:text-red-400" />
          )}
        </button>

        <img
          src={product.images[0]}
          alt={product.title}
          className="h-52 w-full rounded-t object-cover"
        />

        <div className="p-2 w-full">
          <h3 className="font-semibold">
            {product.title.length > 22
              ? product.title.slice(0, 20) + "..."
              : product.title}
          </h3>

          <p className="text-sm text-gray-600 font-semibold">
            {product.category?.name}
          </p>

          <div className="flex items-center justify-between my-2">
            <p className="font-semibold text-emerald-600">
              ${product.price}.00
            </p>

            <div className="text-xs flex items-center gap-1">
              <GoStarFill className="text-yellow-400 text-md" />
              {rating} ({reviewCount})
            </div>
          </div>

          <button
            onClick={addToCart}
            className="p-2 bg-emerald-600 rounded text-gray-50 text-xs w-full cursor-pointer hover:bg-emerald-700 transition duration-200"
          >
            <span className="flex items-center justify-center gap-1">
              <MdOutlineShoppingCart className="text-base" />
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductCard;
