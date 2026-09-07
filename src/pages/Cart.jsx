import React, { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navbar badge update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = cartItems.length ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <HiOutlineShoppingCart className="text-3xl text-emerald-600" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      <p className="text-gray-500 mb-8">
        You have {cartItems.length} items in your cart.
      </p>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-12 text-center">
          <HiOutlineShoppingCart className="text-7xl text-gray-300 mx-auto mb-5" />

          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>

          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>

          <NavLink
            to="/products"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Cart Items */}
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-md p-4 flex flex-col sm:flex-row gap-5 items-center"
              >
                <img
                  src={item.thumbnail || item.image}
                  alt={item.title}
                  className="w-28 h-28 rounded-xl object-cover bg-gray-100"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>

                  <p className="text-sm text-gray-500 capitalize">
                    {typeof item.category === "string"
                      ? item.category.replace("-", " ")
                      : item.category?.name}
                  </p>

                  <p className="text-emerald-600 font-bold text-lg mt-2">
                    ${item.price}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FiMinus />
                    </button>

                    <span className="px-4 font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-red-500 text-sm hover:text-red-600 cursor-pointer"
                  >
                    <FiTrash2 />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">-$0.00</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-emerald-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer">
              Proceed to Checkout
            </button>

            <NavLink
              to="/products"
              className="block text-center mt-4 text-emerald-600 font-semibold hover:underline"
            >
              Continue Shopping
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
