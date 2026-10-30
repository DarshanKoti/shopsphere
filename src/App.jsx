import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Construction from "./pages/Construction";
import Billing from "./pages/Billing";

import About from "./pages/About";

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const protectedPage = (page) =>
    isAuthenticated ? page : <Navigate to="/login" replace />;

  const publicPage = (page) =>
    isAuthenticated ? <Navigate to="/" replace /> : page;

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/login" element={publicPage(<Login />)} />
        <Route path="/signup" element={publicPage(<Signup />)} />

        <Route path="/" element={protectedPage(<Home />)} />

        <Route path="/products" element={protectedPage(<Products />)} />

        <Route
          path="/products/:id"
          element={protectedPage(<ProductDetails />)}
        />

        <Route path="/cart" element={protectedPage(<Cart />)} />
        <Route path="/profile" element={protectedPage(<Profile />)} />
        <Route path="/contact" element={protectedPage(<Contact />)} />

        <Route path="/coming-soon" element={protectedPage(<Construction />)} />

        <Route path="/billing" element={protectedPage(<Billing />)} />

        <Route path="/about" element={<About />} />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>

      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
