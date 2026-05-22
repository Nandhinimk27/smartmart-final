import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-8 py-4 flex justify-between">
      <h1 className="text-2xl font-bold">SmartMart</h1>

      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="text-center mt-20 px-6">
        <h2 className="text-5xl font-bold text-green-800">
          AI-Powered Grocery Shopping Platform
        </h2>

        <p className="mt-4 text-lg text-gray-700">
          Shop groceries, manage cart, place orders, and get smart AI-based
          recommendations.
        </p>

        <Link to="/products">
          <button className="mt-8 bg-green-700 text-white px-6 py-3 rounded-lg">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl p-8">Login Page</h1>
    </div>
  );
}

function PageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={
            <PageLayout>
              <Products />
            </PageLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <PageLayout>
              <Cart />
            </PageLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <PageLayout>
              <Orders />
            </PageLayout>
          }
        />

        <Route
          path="/admin"
          element={
            <PageLayout>
              <AdminDashboard />
            </PageLayout>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;