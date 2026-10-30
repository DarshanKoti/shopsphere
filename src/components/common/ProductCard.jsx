import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { GoStarFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { addToCart } from "../../utils/cart";
import { toggleWishlist } from "../../utils/wishlist";
import { formatCategory, shortTitle } from "../../utils/format";

function ProductCard({ product, liked }) {
  const { user } = useAuth();
  // The card is wrapped in a link, so stop the buttons from navigating.
  const handleLike = (e) => {
    e.preventDefault();
    toggleWishlist(product, user?.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, user?.id);
    alert("Added to Cart");
  };

  return (
    <NavLink to={`/products/${product.id}`}>
      <div className="relative border border-gray-100 rounded-xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-300">
        <button
          onClick={handleLike}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow text-xl hover:scale-110 transition cursor-pointer"
        >
          {liked ? (
            <HiHeart className="text-red-500" />
          ) : (
            <HiOutlineHeart className="text-gray-500 hover:text-red-500" />
          )}
        </button>

        <img
          src={product.images?.[0] || product.thumbnail}
          alt={product.title}
          className="h-52 w-full object-cover bg-gray-100"
        />

        <div className="p-3">
          <h3 className="font-semibold text-sm">{shortTitle(product.title)}</h3>

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
            onClick={handleAddToCart}
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
