import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { GoStarFill } from "react-icons/go";
import { NavLink } from "react-router-dom";

function ProductCard({ product, liked, likedProducts, setLikedProducts }) {
  const toggleLike = (e) => {
    e.preventDefault();

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    setLikedProducts(wishlist.map((item) => item.id));

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const addToCart = (e) => {
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
    <NavLink to={`/products/${product.id}`}>
      <div className="relative border border-gray-100 rounded-xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-300">
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow text-xl hover:scale-110 transition cursor-pointer"
        >
          {liked ? (
            <HiHeart className="text-red-500" />
          ) : (
            <HiOutlineHeart className="text-gray-500 hover:text-red-500" />
          )}
        </button>

        <img
          src={product.images[0]}
          alt={product.title}
          className="h-52 w-full object-cover bg-gray-100"
        />

        <div className="p-3">
          <h3 className="font-semibold text-sm">
            {product.title.length > 22
              ? product.title.slice(0, 20) + "..."
              : product.title}
          </h3>

          <p className="text-xs text-gray-500 capitalize mt-1">
            {product.category.replace("-", " ")}
          </p>

          <div className="flex items-center justify-between my-3">
            <p className="font-bold text-emerald-600">${product.price}</p>

            <div className="flex items-center gap-1 text-xs">
              <GoStarFill className="text-yellow-400" />
              {product.rating}
            </div>
          </div>

          <button
            onClick={addToCart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 rounded-lg transition cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <MdOutlineShoppingCart className="text-lg" />
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductCard;
