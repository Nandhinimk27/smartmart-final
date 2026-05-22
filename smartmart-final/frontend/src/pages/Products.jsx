import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const userId = "guest";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://smartmart-backend-stu8.onrender.com/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch products");
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post("https://smartmart-backend-stu8.onrender.com/api/cart", {
        userId: userId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      });

      alert("Product added to cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-800">
        Smart Mart Products
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-lg border w-full md:w-2/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-lg border w-full md:w-1/3"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg"
              />

              <h2 className="text-2xl font-semibold mt-4">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {product.description}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Category: {product.category}
              </p>

              <p className="text-sm mt-1">
                Stock:{" "}
                <span
                  className={
                    Number(product.stock || 0) <= 5
                      ? "text-red-600 font-bold"
                      : "text-green-600 font-bold"
                  }
                >
                  {product.stock}
                </span>
              </p>

              <p className="text-green-700 text-xl font-bold mt-4">
                ₹{product.price}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg w-full"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;