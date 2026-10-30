import { useState } from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";

const cancellationReasons = [
  "Ordered by mistake",
  "Found a better price",
  "Delivery is taking too long",
  "I chose the wrong product",
  "I no longer need this product",
  "Product details were incorrect",
  "Other",
];

function CancelProductModal({ product, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const [otherDetails, setOtherDetails] = useState("");

  if (!product) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!reason) return;
    if (reason === "Other" && !otherDetails.trim()) return;

    onConfirm({
      reason,
      details: reason === "Other" ? otherDetails.trim() : "",
      cancelledAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Cancel product
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Select a reason for cancellation.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cancellation dialog"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-16 w-16 rounded-lg object-contain"
          />

          <div className="min-w-0">
            <p className="font-medium text-gray-900">{product.title}</p>
            <p className="mt-1 text-sm text-gray-500">
              Quantity: {product.quantity ?? 1}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset className="space-y-3">
            <legend className="mb-3 font-medium text-gray-800">
              Why are you cancelling?
            </legend>

            {cancellationReasons.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
              >
                <input
                  type="radio"
                  name="cancellationReason"
                  value={item}
                  checked={reason === item}
                  onChange={() => {
                    setReason(item);
                    if (item !== "Other") setOtherDetails("");
                  }}
                  className="accent-black"
                  required
                />
                {item}
              </label>
            ))}
          </fieldset>

          {reason === "Other" && (
            <textarea
              value={otherDetails}
              onChange={(event) => setOtherDetails(event.target.value)}
              placeholder="Please explain your reason..."
              rows={3}
              required
              className="mt-4 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-black"
            />
          )}

          <div className="mt-5 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            <FiAlertCircle className="mt-0.5 shrink-0" />
            <p>
              This demo records the cancellation locally. It does not process a
              real refund.
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Keep product
            </button>

            <button
              type="submit"
              disabled={!reason || (reason === "Other" && !otherDetails.trim())}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirm cancellation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CancelProductModal;
