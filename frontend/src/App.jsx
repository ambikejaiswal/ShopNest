import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import AdminOrders from "./pages/AdminOrders";
import Orders from "./pages/Orders";
import MyOrders from "./pages/MyOrders";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrderSuccess from './pages/OrderSuccess';
import Home from './pages/Home'; 
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import About from './pages/About';
import ReturnPolicy from './pages/ReturnPolicy';
import Disclaimer from './pages/Disclaimer';
import Login from './pages/Login';
import Register from './pages/Register';  
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminUsers from './admin/AdminUsers';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
          />
          <Route
            path="/orders"
            element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
           }
          />
          <Route
            path="/admin/orders"
            element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
          />
          <Route path="/about" element={<About />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
              path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
          />
          <Route
            path="/ordersuccess"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
          />
          <Route path="/admin" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute> <AdminProducts /> </AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute> <AdminUsers /> </AdminRoute>} />
          <Route path="/admin/addproduct" element={<AdminRoute> <AddProduct /> </AdminRoute>} />
          <Route path="/admin/editproduct/:id" element={<AdminRoute> <EditProduct /> </AdminRoute>} />
        </Routes> 
      </div>  
      <Footer/> 
    </Router>
  );
};

export default App;
