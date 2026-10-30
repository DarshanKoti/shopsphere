import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { addToCart } from "../../../utils/cart";
import { getWishlist, removeFromWishlist } from "../../../utils/wishlist";
import { formatCategory, shortTitle } from "../../../utils/format";

function Wishlist() {
  const { user, isAuthenticated } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const sync = () => {
      if (isAuthenticated && user?.id) {
        setWishlist(getWishlist(user.id));
      } else {
        setWishlist([]);
      }
    };

    sync();

    window.addEventListener("wishlistUpdated", sync);

    return () => {
      window.removeEventListener("wishlistUpdated", sync);
    };
  }, [user?.id, isAuthenticated]);

  const handleAddToCart = (product) => {
    if (!user?.id) return;

    addToCart(product, 1, user.id);
    alert("Added to Cart");
  };

  const handleRemove = (productId) => {
    if (!user?.id) return;

    removeFromWishlist(productId, user.id);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 text-center">
        <FaRegHeart className="text-5xl text-emerald-600 mx-auto mb-5" />
        <h2 className="text-2xl font-bold mb-3">Login to view your wishlist</h2>
        <NavLink
          to="/login"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg"
        >
          Login
        </NavLink>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 rounded-full bg-[#EDF8F1] flex items-center justify-center mb-6">
            <FaRegHeart className="text-5xl text-emerald-600" />
          </div>

          <h2 className="text-3xl font-bold mb-2">Your Wishlist is Empty</h2>

          <p className="text-gray-500 mb-6 max-w-md">
            Save products you love and they'll appear here.
          </p>

          <NavLink
            to="/products"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Explore Products
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaRegHeart className="text-3xl text-emerald-600" />
        <h2 className="text-3xl font-bold">My Wishlist</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="border border-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <NavLink to={`/products/${product.id}`}>
              <img
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                className="w-full h-44 object-cover bg-gray-100"
              />
            </NavLink>

            <div className="p-3">
              <h3 className="font-semibold text-sm">
                {shortTitle(product.title)}
              </h3>

              <p className="text-xs text-gray-500 capitalize mt-1">
                {formatCategory(product.category)}
              </p>

              <div className="flex items-center justify-between my-3">
                <p className="font-bold text-emerald-600">${product.price}</p>

                <div className="flex items-center gap-1 text-xs">
                  <GoStarFill className="text-yellow-400" />
                  {product.rating}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MdOutlineShoppingCart />
                Add to Cart
              </button>

              <button
                onClick={() => handleRemove(product.id)}
                className="w-full mt-2 border border-red-300 text-red-500 hover:bg-red-500 hover:text-white text-sm font-semibold py-2 rounded-lg transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
