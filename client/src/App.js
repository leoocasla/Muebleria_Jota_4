import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<CatalogoPage />} />
          <Route path="/productos/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* RUTAS PROTEGIDAS (Envueltas en ProtectedRoute) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/admin/crear-producto" element={<CreateProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;