import { NavLink } from "react-router-dom";
import { FiPackage, FiShoppingBag } from "react-icons/fi";

function OrdersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <FiPackage size={36} />
      </div>

      <h2 className="text-xl font-semibold text-gray-900">No orders yet</h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        You haven't placed any orders yet. Explore our products and find
        something you love.
      </p>

      <NavLink
        to="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-800"
      >
        <FiShoppingBag size={17} />
        Explore Products
      </NavLink>
    </div>
  );
}

export default OrdersEmptyState;
