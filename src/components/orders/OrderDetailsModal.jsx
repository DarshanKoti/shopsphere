import {
  FiX,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
  FiPackage,
} from "react-icons/fi";
import { formatCategory, formatDate } from "../../utils/format";

function formatMoney(amount) {
  return `$${(Number(amount) || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function InfoRow({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-gray-800">
        {value || "Not available"}
      </p>
    </div>
  );
}

function OrderDetailsModal({ order, product, onClose, onCancelProduct }) {
  if (!order || !product) return null;

  const isCancelled = Boolean(product.cancelled);
  const customer = order.customer ?? {};

  const address = [
    customer.address,
    customer.city,
    customer.state,
    customer.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  let estimatedDelivery = order.estimatedDelivery;

  if (!estimatedDelivery && order.date) {
    const orderedDate = new Date(order.date);

    if (!Number.isNaN(orderedDate.getTime())) {
      orderedDate.setDate(orderedDate.getDate() + 5);
      estimatedDelivery = orderedDate;
    }
  }

  const price = Number(product.price) || 0;
  const quantity = Number(product.quantity) || 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        className="flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
              <FiPackage size={20} />
            </div>

            <div className="min-w-0">
              <h2
                id="order-details-title"
                className="text-lg font-semibold text-gray-900 sm:text-xl"
              >
                Product Details
              </h2>
              <p className="truncate text-xs text-gray-500 sm:text-sm">
                Order ID: {order.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          <section className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <div className="flex h-44 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-48 sm:w-48">
              <img
                src={product.thumbnail}
                alt={product.title || "Ordered product"}
                className="h-full w-full object-contain p-4"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold leading-snug text-gray-900 sm:text-xl">
                {product.title}
              </h3>

              {product.brand && (
                <p className="mt-2 text-sm text-gray-500">
                  Brand: {product.brand}
                </p>
              )}

              {product.category && (
                <p className="mt-1 text-sm capitalize text-gray-500">
                  Category: {formatCategory(product.category)}
                </p>
              )}

              {product.description && (
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 sm:grid-cols-3">
                <InfoRow label="Quantity" value={quantity} />
                <InfoRow label="Unit price" value={formatMoney(price)} />

                <div className="col-span-2 border-t border-gray-200 pt-3 sm:col-span-1 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                  <InfoRow
                    label="Item total"
                    value={formatMoney(price * quantity)}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <section className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <FiCalendar size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Delivery Information
                </h3>
              </div>

              <div className="space-y-4">
                <InfoRow label="Ordered on" value={formatDate(order.date)} />
                <InfoRow
                  label="Estimated delivery"
                  value={formatDate(estimatedDelivery)}
                />
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                  <FiCreditCard size={18} />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Payment Information
                </h3>
              </div>

              <div className="space-y-4">
                <InfoRow label="Payment method" value={order.paymentMethod} />
                <InfoRow label="Payment status" value={order.paymentStatus} />
                <InfoRow label="Order total" value={formatMoney(order.total)} />
              </div>
            </section>
          </div>

          <section className="mt-4 rounded-xl border border-gray-200 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-green-50 p-2 text-green-600">
                <FiMapPin size={18} />
              </div>
              <h3 className="font-semibold text-gray-900">Delivery Address</h3>
            </div>

            <div className="space-y-1 break-words text-sm leading-6 text-gray-600">
              <p className="font-medium text-gray-900">
                {customer.fullName || customer.name || "Customer"}
              </p>
              {address && <p>{address}</p>}
              {customer.email && <p>{customer.email}</p>}
              {customer.phone && <p>{customer.phone}</p>}

              {!address && !customer.email && !customer.phone && (
                <p>Address details are not available.</p>
              )}
            </div>
          </section>

          {isCancelled && (
            <section className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">Product Cancelled</h3>

              <div className="mt-3 space-y-2 break-words text-sm text-red-700">
                <p>
                  <strong>Reason:</strong>{" "}
                  {product.cancellation?.reason || "Not specified"}
                </p>

                {product.cancellation?.details && (
                  <p>
                    <strong>Details:</strong> {product.cancellation.details}
                  </p>
                )}

                {product.cancellation?.cancelledAt && (
                  <p>
                    <strong>Cancelled on:</strong>{" "}
                    {formatDate(product.cancellation.cancelledAt)}
                  </p>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-100 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 sm:w-auto"
          >
            Close
          </button>

          {!isCancelled && (
            <button
              type="button"
              onClick={() => onCancelProduct(product)}
              className="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
            >
              Cancel Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
