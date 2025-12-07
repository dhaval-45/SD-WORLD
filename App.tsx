
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { AIChatWidget } from './components/AIChatWidget';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

// Admin Imports
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';

const StoreLayout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <CartDrawer />
    <main className="flex-1">
      {children}
    </main>
    <AIChatWidget />
    <Footer />
    <AuthModal />
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<div className="p-8 text-gray-500">Customer management coming soon...</div>} />
              <Route path="settings" element={<div className="p-8 text-gray-500">Settings coming soon...</div>} />
            </Route>

            {/* Storefront Routes */}
            <Route path="/" element={
              <StoreLayout>
                <Home />
              </StoreLayout>
            } />
            <Route path="/shop" element={
              <StoreLayout>
                <Shop />
              </StoreLayout>
            } />
            <Route path="/product/:id" element={
              <StoreLayout>
                <ProductDetail />
              </StoreLayout>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
