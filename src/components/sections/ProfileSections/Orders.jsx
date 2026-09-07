import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

function Orders() {
  const orders = [
    {
      id: "#ORD-1024",
      name: "Nike Air Running Shoes",
      price: "$120",
      qty: 1,
      date: "05 Sep 2026",
      status: "Delivered",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: "#ORD-1023",
      name: "Sony Wireless Headphones",
      price: "$89",
      qty: 1,
      date: "02 Sep 2026",
      status: "Shipped",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: "#ORD-1022",
      name: "Premium Casual Hoodie",
      price: "$45",
      qty: 2,
      date: "29 Aug 2026",
      status: "Processing",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&auto=format&fit=crop&q=80",
    },
  ];

  const statusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle className="text-green-600" />;
      case "Shipped":
        return <TbTruckDelivery className="text-blue-600 text-lg" />;
      default:
        return <IoTimeOutline className="text-orange-500 text-lg" />;
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <HiOutlineShoppingBag className="text-3xl text-emerald-600" />
        <h2 className="text-3xl font-bold">My Orders</h2>
      </div>

      <p className="text-gray-500 mb-8">
        Track your recent purchases and order history.
      </p>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col md:flex-row gap-5 items-center">
              {/* Product Image */}
              <img
                src={order.image}
                alt={order.name}
                className="w-28 h-28 rounded-xl object-cover bg-gray-100"
              />

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-bold text-lg">{order.name}</h3>

                <p className="text-sm text-gray-500 mt-1">{order.id}</p>

                <p className="text-sm text-gray-500">Ordered on {order.date}</p>

                <p className="text-sm text-gray-500 mt-1">
                  Quantity: <span className="font-medium">{order.qty}</span>
                </p>
              </div>

              {/* Price & Status */}
              <div className="text-center md:text-right">
                <p className="text-2xl font-bold text-emerald-600">
                  {order.price}
                </p>

                <div
                  className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                    order.status,
                  )}`}
                >
                  {statusIcon(order.status)}
                  {order.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Summary */}
      <div className="mt-8 bg-[#EDF8F1] rounded-xl p-5 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Total Orders</h3>
          <p className="text-gray-600">
            You have placed {orders.length} orders.
          </p>
        </div>

        <div className="text-3xl font-bold text-emerald-600 mt-3 md:mt-0">
          {orders.length}
        </div>
      </div>
    </div>
  );
}

export default Orders;
