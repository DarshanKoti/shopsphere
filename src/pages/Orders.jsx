import { useCallback, useEffect, useState } from "react";
import OrdersList from "../components/orders/OrdersList";
import OrdersEmptyState from "../components/orders/OrdersEmptyState";
import OrderDetailsModal from "../components/orders/OrderDetailsModal";
import CancelProductModal from "../components/orders/CancelProductModal";

const ORDERS_KEY = "orders";

function readOrders() {
  try {
    const savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

    return Array.isArray(savedOrders) ? savedOrders : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event("ordersUpdated"));
}

function Orders() {
  const [orders, setOrders] = useState(readOrders);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cancellationProduct, setCancellationProduct] = useState(null);

  const refreshOrders = useCallback(() => {
    setOrders(readOrders());
  }, []);

  useEffect(() => {
    window.addEventListener("ordersUpdated", refreshOrders);

    return () => {
      window.removeEventListener("ordersUpdated", refreshOrders);
    };
  }, [refreshOrders]);

  const openDetails = (order, product, itemIndex) => {
    setSelectedProduct({ order, product, itemIndex });
  };

  const openCancellation = (order, product, itemIndex) => {
    setCancellationProduct({ order, product, itemIndex });
  };

  const confirmCancellation = (cancellation) => {
    if (!cancellationProduct) return;

    const { order, itemIndex } = cancellationProduct;

    const updatedOrders = orders.map((currentOrder) => {
      if (String(currentOrder.id) !== String(order.id)) {
        return currentOrder;
      }

      const updatedItems = (currentOrder.items || []).map((item, index) => {
        if (index !== itemIndex || item.cancelled) {
          return item;
        }

        return {
          ...item,
          cancelled: true,
          cancellation,
        };
      });

      const allCancelled =
        updatedItems.length > 0 && updatedItems.every((item) => item.cancelled);

      const someCancelled = updatedItems.some((item) => item.cancelled);

      return {
        ...currentOrder,
        items: updatedItems,
        status: allCancelled
          ? "Cancelled"
          : someCancelled
            ? "Partially Cancelled"
            : currentOrder.status || "Processing",
      };
    });

    saveOrders(updatedOrders);
    setOrders(updatedOrders);
    setCancellationProduct(null);
    setSelectedProduct(null);
  };

  const handleViewDetails = (order, product, itemIndex) => {
    openDetails(order, product, itemIndex);
  };

  const handleCancelProduct = (order, product, itemIndex) => {
    openCancellation(order, product, itemIndex);
  };

  const getCurrentProduct = (selection) => {
    if (!selection) return null;

    const currentOrder = orders.find(
      (order) => String(order.id) === String(selection.order.id),
    );

    if (!currentOrder) return null;

    return {
      order: currentOrder,
      product: currentOrder.items?.[selection.itemIndex],
      itemIndex: selection.itemIndex,
    };
  };

  const currentDetails = getCurrentProduct(selectedProduct);
  const currentCancellation = getCurrentProduct(cancellationProduct);

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
          onViewDetails={handleViewDetails}
          onCancelProduct={handleCancelProduct}
        />
      )}

      {currentDetails?.product && (
        <OrderDetailsModal
          order={currentDetails.order}
          product={currentDetails.product}
          onClose={() => setSelectedProduct(null)}
          onCancelProduct={() => {
            setCancellationProduct(currentDetails);
            setSelectedProduct(null);
          }}
        />
      )}

      {currentCancellation?.product && (
        <CancelProductModal
          product={currentCancellation.product}
          onClose={() => setCancellationProduct(null)}
          onConfirm={confirmCancellation}
        />
      )}
    </main>
  );
}

export default Orders;
