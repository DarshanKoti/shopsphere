import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { MdOutlineShoppingBag, MdOutlinePayment } from "react-icons/md";
import { FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";

import { useAuth } from "../context/AuthContext";
import { getCart, getTotals, saveCart } from "../utils/cart";
import { readList, readJSON, writeJSON } from "../utils/storage";

const PAYMENT_METHODS = [
  {
    id: "UPI",
    title: "Demo UPI",
    description: "Simulated UPI payment",
    icon: <SiGooglepay className="text-2xl text-gray-800" />,
  },
  {
    id: "Card",
    title: "Demo Card",
    description: "Simulated card payment",
    icon: <FaCreditCard className="text-xl text-gray-700" />,
  },
];

const getProfileKey = (userId) => `profile_${userId}`;

const getProfile = (user) => {
  if (!user?.id) return {};

  return readJSON(getProfileKey(user.id), {});
};

const getInitialFormData = (user) => {
  const profile = getProfile(user);
  const address = profile.address || {};

  return {
    fullName: profile.name || user?.name || "",
    email: profile.email || user?.email || "",
    phone: profile.phone || "",
    alternatePhone: profile.alternatePhone || "",
    house: address.house || "",
    street: address.street || "",
    landmark: address.landmark || "",
    city: address.city || "",
    state: address.state || "",
    pincode: address.pincode || "",
    country: address.country || "India",
    address: [address.house, address.street, address.landmark]
      .filter(Boolean)
      .join(", "),
  };
};

function Billing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cart, setCart] = useState(() => getCart(user?.id));
  const [step, setStep] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paymentError, setPaymentError] = useState("");
  const [order, setOrder] = useState(null);

  const [formData, setFormData] = useState(() => getInitialFormData(user));

  // Refresh checkout details when the logged-in account changes
  useEffect(() => {
    setFormData(getInitialFormData(user));
    setCart(getCart(user?.id));
    setStep("delivery");
    setOrder(null);
    setPaymentError("");
  }, [user?.id]);

  const { subtotal, shipping, total } = getTotals(cart);

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Keep the combined address updated
      if (["house", "street", "landmark"].includes(name)) {
        updated.address = [
          name === "house" ? value : updated.house,
          name === "street" ? value : updated.street,
          name === "landmark" ? value : updated.landmark,
        ]
          .filter(Boolean)
          .join(", ");
      }

      return updated;
    });
  };

  // Save checkout details back to the current user's profile
  const saveDeliveryToProfile = () => {
    if (!user?.id) return;

    const profileKey = getProfileKey(user.id);
    const existingProfile = getProfile(user);

    const updatedProfile = {
      ...existingProfile,
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      alternatePhone: formData.alternatePhone.trim(),
      address: {
        ...(existingProfile.address || {}),
        house: formData.house.trim(),
        street: formData.street.trim(),
        landmark: formData.landmark.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        country: formData.country.trim(),
      },
    };

    writeJSON(profileKey, updatedProfile);

    window.dispatchEvent(new Event("profileUpdated"));
  };

  const continueToPayment = (e) => {
    e.preventDefault();

    if (!cart.length) {
      navigate("/products");
      return;
    }

    // Persist updated delivery details to the user's profile
    saveDeliveryToProfile();

    setPaymentError("");
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Demo only: no actual payment is made.
  const simulatePayment = (success) => {
    if (!success) {
      setPaymentError(
        "Demo payment failed. No order has been placed. You can try again.",
      );
      return;
    }

    try {
      if (!user?.id) throw new Error("Please sign in before placing an order.");

      const ordersKey = `orders_${user.id}`;
      const previousOrders = readList(ordersKey);

      const orderedAt = new Date();
      const estimatedDelivery = new Date(orderedAt);
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

      const customer = {
        ...formData,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: [formData.house, formData.street, formData.landmark]
          .filter(Boolean)
          .join(", "),
      };

      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: user?.id || null,
        customer,
        items: cart,
        subtotal,
        shipping,
        total,
        status: "Processing",
        paymentStatus: "Paid (Demo)",
        paymentMethod: `Demo ${paymentMethod}`,
        date: orderedAt.toISOString(),
        estimatedDelivery: estimatedDelivery.toISOString(),
      };

      writeJSON(ordersKey, [newOrder, ...previousOrders]);
      saveCart([], user.id);
      setCart([]);

      setOrder(newOrder);
      setPaymentError("");
      setStep("success");

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setPaymentError(
        "We couldn't save your order. Your cart has not been cleared. Please try again.",
      );
    }
  };

  if (!cart.length && step !== "success") {
    return (
      <main className="max-w-3xl mx-auto px-5 py-20 text-center">
        <MdOutlineShoppingBag className="mx-auto text-6xl text-gray-300" />

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add something you love before heading to checkout.
        </p>

        <NavLink
          to="/products"
          className="inline-block mt-6 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Explore products
        </NavLink>
      </main>
    );
  }

  if (step === "success" && order) {
    return (
      <main className="max-w-xl mx-auto px-5 py-16 sm:py-24">
        <div className="rounded-2xl border border-gray-200 bg-white p-7 sm:p-10 text-center">
          <FaCheckCircle className="mx-auto text-5xl text-emerald-600" />

          <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            Demo payment successful
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Order confirmed
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Thanks for shopping with ShopSphere. Your order has been saved to
            your order history.
          </p>

          <div className="mt-7 rounded-xl bg-gray-50 p-5 text-left">
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="font-semibold text-gray-900 break-all">
                {order.id}
              </span>
            </div>

            <div className="mt-4 flex justify-between gap-3 text-sm">
              <span className="text-gray-500">Payment method</span>
              <span className="font-medium">{order.paymentMethod}</span>
            </div>

            <div className="mt-4 flex justify-between gap-3 text-sm">
              <span className="text-gray-500">Payment status</span>
              <span className="font-semibold text-emerald-700">
                Paid (Demo)
              </span>
            </div>

            <div className="mt-4 flex justify-between gap-3 border-t border-gray-200 pt-4">
              <span className="font-semibold">Order total</span>
              <span className="text-xl font-bold text-emerald-700">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            This was a simulation. No money was charged.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
            <NavLink
              to="/profile"
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold hover:bg-gray-50"
            >
              View my orders
            </NavLink>

            <NavLink
              to="/products"
              className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Continue shopping
            </NavLink>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/70">
      <div className="max-w-6xl mx-auto px-5 py-9 sm:py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
            ShopSphere / Checkout
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {step === "delivery" ? "Checkout" : "Complete your payment"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {step === "delivery"
              ? "Your saved profile details are filled in automatically."
              : "Review your order and simulate a demo payment."}
          </p>
        </div>

        {/* Checkout Steps */}
        <div className="mb-8 flex max-w-lg items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
              1
            </span>
            <span className="text-sm font-medium text-gray-900">Delivery</span>
          </div>

          <div className="h-px flex-1 bg-gray-300" />

          <div className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step === "payment"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </span>

            <span
              className={`text-sm ${
                step === "payment"
                  ? "font-medium text-gray-900"
                  : "text-gray-500"
              }`}
            >
              Payment
            </span>
          </div>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[1fr_350px]">
          {/* Delivery and Payment Section */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-7">
            {step === "delivery" ? (
              <form onSubmit={continueToPayment}>
                <div className="mb-6 flex items-center gap-3">
                  <HiOutlineLocationMarker className="text-2xl text-emerald-700" />

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Delivery information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Your saved profile details are editable here.
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Personal Information
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2 block text-sm font-medium text-gray-700">
                    Full name *
                    <span className="relative mt-2 block">
                      <HiOutlineUser className="absolute left-3 top-3.5 text-lg text-gray-400" />
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                        maxLength={100}
                        required
                        placeholder="Your full name"
                        className={`${inputClass} pl-10`}
                      />
                    </span>
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    Email address *
                    <span className="relative mt-2 block">
                      <HiOutlineMail className="absolute left-3 top-3.5 text-lg text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        className={`${inputClass} pl-10`}
                      />
                    </span>
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    Phone number *
                    <span className="relative mt-2 block">
                      <HiOutlinePhone className="absolute left-3 top-3.5 text-lg text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit phone number"
                        required
                        placeholder="10-digit number"
                        className={`${inputClass} pl-10`}
                      />
                    </span>
                  </label>

                  <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
                    Alternate phone number
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      autoComplete="tel"
                      placeholder="Optional alternate number"
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                </div>

                {/* Delivery Address */}
                <h3 className="mb-4 mt-8 border-t border-gray-200 pt-6 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Shipping Address
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-gray-700">
                    House / Flat Number *
                    <input
                      name="house"
                      value={formData.house}
                      onChange={handleChange}
                      autoComplete="address-line1"
                      required
                      placeholder="House / Flat number"
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    Street / Area *
                    <input
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      autoComplete="address-line2"
                      required
                      placeholder="Street or area"
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
                    Landmark
                    <input
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="Nearby landmark"
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    City *
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      required
                      maxLength={100}
                      placeholder="Your city"
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    State *
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      autoComplete="address-level1"
                      required
                      maxLength={100}
                      placeholder="Your state"
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    PIN code *
                    <input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      autoComplete="postal-code"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      title="Enter a 6-digit PIN code"
                      required
                      placeholder="6-digit PIN code"
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    Country *
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      autoComplete="country-name"
                      required
                      placeholder="Country"
                      className={`${inputClass} mt-2`}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-7 w-full rounded-lg bg-emerald-600 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Continue to payment
                </button>
              </form>
            ) : (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <MdOutlinePayment className="text-2xl text-emerald-700" />

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Choose a demo payment method
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      This checkout does not collect or transfer money.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(method.id);
                        setPaymentError("");
                      }}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        paymentMethod === method.id
                          ? "border-emerald-600 bg-emerald-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {method.icon}

                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-gray-900">
                          {method.title}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          {method.description}
                        </span>
                      </span>

                      <span
                        className={`h-4 w-4 rounded-full border ${
                          paymentMethod === method.id
                            ? "border-4 border-emerald-600"
                            : "border-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-900">
                    Demo mode
                  </p>
                  <p className="mt-1 text-sm leading-5 text-amber-800">
                    No real payment is processed. Use the buttons below to
                    simulate a successful or failed payment.
                  </p>
                </div>

                {paymentError && (
                  <p
                    role="alert"
                    className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                  >
                    {paymentError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => simulatePayment(true)}
                  className="mt-6 w-full rounded-lg bg-emerald-600 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Simulate successful payment · ${total.toFixed(2)}
                </button>

                <button
                  type="button"
                  onClick={() => simulatePayment(false)}
                  className="mt-3 w-full rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Simulate failed payment
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentError("");
                    setStep("delivery");
                  }}
                  className="mt-4 w-full text-sm text-gray-500 hover:text-emerald-700"
                >
                  ← Back to delivery details
                </button>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <aside className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold text-gray-900">Order summary</h2>

            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                    <img
                      src={
                        item.thumbnail || item.images?.[0] || item.image || ""
                      }
                      alt={item.title}
                      className="h-full w-full rounded-lg object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-sm font-medium">
                    $
                    {(
                      Number(item.price || 0) * Number(item.quantity || 1)
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-t border-gray-200 pt-5 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Shipping</span>
                <span
                  className={
                    shipping === 0 ? "font-medium text-emerald-700" : ""
                  }
                >
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between gap-3 border-t border-gray-200 pt-4">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-emerald-700">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-500">
              Demo checkout only. No real money will be charged.
            </p>

            <NavLink
              to="/cart"
              className="mt-4 block text-center text-sm text-gray-500 hover:text-emerald-700"
            >
              Return to cart
            </NavLink>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Billing;
