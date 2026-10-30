import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function OrderItem({ product, onViewDetails }) {
  const navigate = useNavigate();
  const isCancelled = Boolean(product.cancelled);
  const quantity = Number(product.quantity) || 1;
  const price = Number(product.price) || 0;

  const openProduct = () => {
    if (product.id != null) {
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-t border-gray-100 py-4 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={openProduct}
        className="flex min-w-0 flex-1 items-center gap-4 text-left"
      >
        <img
          src={product.thumbnail}
          alt={product.title || "Product"}
          className="h-20 w-20 shrink-0 rounded-xl bg-gray-50 object-contain p-2"
        />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-medium text-gray-900">
            {product.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">Quantity: {quantity}</p>

          <p className="mt-1 font-semibold text-gray-900">
            ${(price * quantity).toLocaleString("en-IN")}
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
              isCancelled
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {isCancelled ? "Cancelled" : "Ordered"}
          </span>
        </div>
      </button>

      <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col">
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <FiEye size={16} />
          View Details
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
