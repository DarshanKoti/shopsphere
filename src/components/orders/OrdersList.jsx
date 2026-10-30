import { FiPackage } from "react-icons/fi";
import OrderItem from "./OrderItem";

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getOrderStatus(order) {
  const items = order.items ?? [];

  if (items.length > 0 && items.every((item) => item.cancelled)) {
    return "Cancelled";
  }

  if (items.some((item) => item.cancelled)) {
    return "Partially Cancelled";
  }

  return order.status || "Processing";
}

function getStatusStyle(status) {
  if (status === "Cancelled") {
    return "bg-red-50 text-red-700";
  }

  if (status === "Partially Cancelled") {
    return "bg-orange-50 text-orange-700";
  }

  if (status === "Delivered") {
    return "bg-green-50 text-green-700";
  }

  return "bg-blue-50 text-blue-700";
}

function OrdersList({ orders, onViewDetails, onCancelProduct }) {
  if (!orders?.length) return null;

  return (
    <div className="space-y-5">
      {orders.map((order) => {
        const status = getOrderStatus(order);

        return (
          <section
            key={order.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            {/* Order header */}
            <div className="flex flex-col justify-between gap-4 bg-gray-50 p-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-3 text-gray-700 shadow-sm">
                  <FiPackage size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Order #{order.id}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(status)}`}
                >
                  {status}
                </span>

                <p className="font-semibold text-gray-900">
                  ${(Number(order.total) || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Ordered products */}
            <div className="px-4 sm:px-5">
              {(order.items ?? []).map((product, index) => (
                <OrderItem
                  key={`${product.id}-${index}`}
                  product={product}
                  onViewDetails={(item) => onViewDetails(order, item, index)}
                  onCancelProduct={(item) =>
                    onCancelProduct(order, item, index)
                  }
                />
              ))}

              {(!order.items || order.items.length === 0) && (
                <p className="py-5 text-sm text-gray-500">
                  No products found for this order.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default OrdersList;
