import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchLowStock();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(
      "https://smartmart-backend-stu8.onrender.com/api/products"
    );

    setProducts(response.data);
  };

  const fetchOrders = async () => {
    const response = await axios.get(
      "https://smartmart-backend-stu8.onrender.com/api/products"
    );

    setOrders(response.data);
  };

  const fetchLowStock = async () => {
    const response = await axios.get(
      "https://smartmart-backend-stu8.onrender.com/api/ai/low-stock"
    );

    setLowStock(response.data.products);
  };

  const deleteProduct = async (id) => {
    await axios.delete(
      `https://smartmart-backend-stu8.onrender.com/api/products/${id}`
    );

    fetchProducts();
    fetchLowStock();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
     `https://smartmart-backend-stu8.onrender.com/api/orders/${id}`,
      { status }
    );

    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
        Admin Dashboard
      </h1>

      {/* AI ALERT SECTION */}
      <div className="bg-red-100 border border-red-400 p-5 rounded-xl mb-10">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          AI Low Stock Alert
        </h2>

        {lowStock.length === 0 ? (
          <p>No low stock products</p>
        ) : (
          lowStock.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-2"
            >
              <span>{item.name}</span>
              <span className="font-bold text-red-700">
                Stock: {item.stock}
              </span>
            </div>
          ))
        )}
      </div>

      {/* PRODUCTS */}
      <h2 className="text-2xl font-bold mb-4">
        Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h3 className="text-xl font-bold mt-3">
              {product.name}
            </h3>

            <p>₹{product.price}</p>
            <p>Stock: {product.stock}</p>

            <button
              onClick={() => deleteProduct(product._id)}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <h2 className="text-2xl font-bold mb-4">
        Orders
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-5 rounded-xl shadow mb-4"
        >
          <p className="font-bold">
            Order ID: {order._id}
          </p>

          <p>Total: ₹{order.totalAmount}</p>
          <p>Address: {order.address}</p>
          <p>Status: {order.status}</p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(
                order._id,
                e.target.value
              )
            }
            className="mt-3 border p-2 rounded"
          >
            <option>Pending</option>
            <option>Packed</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;