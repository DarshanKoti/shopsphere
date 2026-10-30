import { useEffect, useState } from "react";
import OrdersList from "../components/orders/OrdersList";
import OrdersEmptyState from "../components/orders/OrdersEmptyState";
import OrderDetailsModal from "../components/orders/OrderDetailsModal";
import CancelProductModal from "../components/orders/CancelProductModal";
import { readList, writeJSON } from "../utils/storage";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { user } = useAuth();
  const ordersKey = user?.id ? `orders_${user.id}` : null;
  const [orders, setOrders] = useState([]);

  const [detailsTarget, setDetailsTarget] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);

  useEffect(() => {
    if (!ordersKey) {
      setOrders([]);
      setDetailsTarget(null);
      setCancelTarget(null);
      return;
    }

    // Migrate only legacy orders explicitly tagged with this account's userId.
    // Untagged legacy orders are deliberately not assigned to any account.
    const accountOrders = readList(ordersKey);
    const legacyOrders = readList("orders").filter(
      (order) => order.userId === user.id,
    );
    const existingIds = new Set(accountOrders.map((order) => String(order.id)));
    const mergedOrders = [
      ...accountOrders,
      ...legacyOrders.filter(
        (order) => !existingIds.has(String(order.id)),
      ),
    ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

    if (mergedOrders.length !== accountOrders.length) {
      writeJSON(ordersKey, mergedOrders);
    }

    setOrders(mergedOrders);
    setDetailsTarget(null);
    setCancelTarget(null);
  }, [ordersKey, user?.id]);

  const findItem = (target) => {
    if (!target) return null;

    const order = orders.find((item) => String(item.id) === String(target.orderId));
    const product = order?.items?.[target.itemIndex];

    return order && product ? { order, product } : null;
  };

  const details = findItem(detailsTarget);
  const cancellation = findItem(cancelTarget);

  const confirmCancellation = (cancellationInfo) => {
    if (!cancelTarget || !ordersKey) return;

    const { orderId, itemIndex } = cancelTarget;

    const updatedOrders = orders.map((order) => {
      if (String(order.id) !== String(orderId)) return order;

      const items = (order.items || []).map((item, index) =>
        index === itemIndex && !item.cancelled
          ? { ...item, cancelled: true, cancellation: cancellationInfo }
          : item,
      );

      const cancelledCount = items.filter((item) => item.cancelled).length;

      let status = order.status || "Processing";
      if (items.length > 0 && cancelledCount === items.length) {
        status = "Cancelled";
      } else if (cancelledCount > 0) {
        status = "Partially Cancelled";
      }

      return { ...order, items, status };
    });

    writeJSON(ordersKey, updatedOrders);
    setOrders(updatedOrders);
    setCancelTarget(null);
    setDetailsTarget(null);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          My Orders
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View your purchases, track delivery estimates, and manage individual
          products.
        </p>
      </div>

      {orders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <OrdersList
          orders={orders}
          onViewDetails={(order, itemIndex) =>
            setDetailsTarget({ orderId: order.id, itemIndex })
          }
        />
      )}

      {details && (
        <OrderDetailsModal
          order={details.order}
          product={details.product}
          onClose={() => setDetailsTarget(null)}
          onCancelProduct={() => {
            setCancelTarget(detailsTarget);
            setDetailsTarget(null);
          }}
        />
      )}

      {cancellation && (
        <CancelProductModal
          product={cancellation.product}
          onClose={() => setCancelTarget(null)}
          onConfirm={confirmCancellation}
        />
      )}
    </main>
  );
}

export default Orders;
