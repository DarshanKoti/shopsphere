import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { addToCart } from "../../utils/cart";
import { formatCategory, shortTitle } from "../../utils/format";

// Compact card used by the home page rows (trending, best sellers).
function ProductTile({ product }) {
  const { user } = useAuth();
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, user?.id);
    alert("Added to Cart");
  };

  return (
    <NavLink
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
        <h3 className="font-semibold text-sm">{shortTitle(product.title)}</h3>

        <p className="text-xs text-gray-500 capitalize mt-1">
          {formatCategory(product.category)}
        </p>

        <div className="flex items-center gap-1 text-xs my-2">
          <GoStarFill className="text-yellow-400" />
          {product.rating}
        </div>

        <div className="flex justify-between items-center">
          <p className="font-bold text-emerald-600">${product.price}</p>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="bg-gray-100 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition cursor-pointer"
          >
            <MdOutlineShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </NavLink>
  );
}

export default ProductTile;
