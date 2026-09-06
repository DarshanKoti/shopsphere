import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

function Orders() {
  const orders = [
    {
      id: "#ORD-1024",
      name: "Premium Running Shoes",
      price: "$120",
      date: "05 Sep 2026",
      status: "Delivered",
      image: "https://i.imgur.com/qNOjJje.jpeg",
    },
    {
      id: "#ORD-1023",
      name: "Wireless Headphones",
      price: "$89",
      date: "02 Sep 2026",
      status: "Shipped",
      image: "https://i.imgur.com/ZANVnHE.jpeg",
    },
    {
      id: "#ORD-1022",
      name: "Casual Hoodie",
      price: "$45",
      date: "29 Aug 2026",
      status: "Processing",
      image: "https://i.imgur.com/9LFjwpI.jpeg",
    },
  ];

  const statusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle className="text-green-600" />;
      case "Shipped":
        return <TbTruckDelivery className="text-blue-600" />;
      default:
        return <IoTimeOutline className="text-orange-500" />;
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
            className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-center gap-5 hover:shadow-md transition duration-200"
          >
            <img
              src={order.image}
              alt={order.name}
              className="w-24 h-24 object-cover rounded-lg bg-gray-100"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{order.name}</h3>
              <p className="text-sm text-gray-500">{order.id}</p>
              <p className="text-sm text-gray-500">Ordered on {order.date}</p>
            </div>

            <div className="text-center md:text-right">
              <p className="font-bold text-emerald-600 text-lg">
                {order.price}
              </p>

              <div
                className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                  order.status,
                )}`}
              >
                {statusIcon(order.status)}
                {order.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
