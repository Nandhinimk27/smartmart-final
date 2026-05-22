import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");

  const userId = "guest";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `https://smartmart-backend-stu8.onrender.com/api/cart/${userId}`
      );
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch cart");
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`https://smartmart-backend-stu8.onrender.com/api/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Failed to remove item");
    }
  };

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter delivery address");
      return;
    }

    try {
      await axios.post("https://smartmart-backend-stu8.onrender.com/api/orders", {
        userId,
        address
      });

      alert("Order placed successfully");
      setAddress("");
      fetchCart();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl text-gray-700">
          Your cart is empty.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-5 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>

              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-3xl font-bold text-right mt-6">
            Total: ₹{totalAmount}
          </h2>

          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-6 p-4 border rounded-lg"
            rows="3"
          />

          <button
            onClick={placeOrder}
            className="mt-4 bg-green-700 text-white px-6 py-3 rounded-lg w-full"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;