import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const userId = "guest";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://smartmart-backend-stu8.onrender.com/api/orders/user/${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch orders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-xl text-gray-700">
          No orders found.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-5 mb-5"
            >
              <h2 className="text-xl font-bold">
                Order ID: {order._id}
              </h2>

              <p className="mt-2">
                Status:{" "}
                <span className="font-bold text-green-700">
                  {order.status}
                </span>
              </p>

              <p>Address: {order.address}</p>
              <p>Total: ₹{order.totalAmount}</p>

              <div className="mt-4">
                <h3 className="font-semibold">Items:</h3>

                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;