import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../components/ContactForm/ContactForm.css';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (getCartCount() === 0) {
    return (
      <div className="contact-form-container">
        <h3 className="form-title">Tu Carrito Está Vacío</h3>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          No hay productos para proceder a la compra.
        </p>
        <button onClick={() => navigate('/productos')} className="cta-button">
          Ir al Catálogo
        </button>
      </div>
    );
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formattedOrderItems = cartItems.map(item => ({
      product: item.product._id,
      name: item.product.nombre,
      qty: item.qty,
      price: item.product.precio,
    }));
    
    const orderData = {
      orderItems: formattedOrderItems,
      shippingAddress,
      totalPrice: parseFloat(getTotalPrice()),
    };
    
    try {
      // POST a la ruta PROTEGIDA (/api/orders). 
      // Axios adjuntará el JWT automáticamente gracias al AuthContext.
      await axios.post('/api/orders', orderData);

      clearCart();
      alert('¡Pedido realizado con éxito!');
      navigate('/perfil');

    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la compra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="detail-container">
      <h1 className="section-title">Finalizar Compra</h1>
      
      {/* 1. Resumen del Carrito */}
      <div className="product-list-section" style={{ borderBottom: '1px solid #ddd', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-texto-principal)' }}>Resumen del Pedido</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.product._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <span>{item.product.nombre} x {item.qty}</span>
              <span>${(item.product.precio * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h3 style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <span>Total:</span>
          <span className="product-price">${getTotalPrice()}</span>
        </h3>
      </div>
      
      {/* 2. Formulario de Envío */}
      <h2 style={{ fontSize: '1.5rem', color: 'var(--color-texto-principal)', marginBottom: '1.5rem' }}>Datos de Envío</h2>
      <form onSubmit={handleCheckout} className="contact-form">
        
        <input type="text" name="address" placeholder="Dirección Completa" value={shippingAddress.address} onChange={handleAddressChange} required />
        <input type="text" name="city" placeholder="Ciudad" value={shippingAddress.city} onChange={handleAddressChange} required />
        <input type="text" name="postalCode" placeholder="Código Postal" value={shippingAddress.postalCode} onChange={handleAddressChange} required />
        
        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? 'Procesando...' : `Pagar $${getTotalPrice()}`}
        </button>
      </form>

      <button onClick={() => navigate('/productos')} className="back-button" style={{ marginTop: '2rem' }}>
        ← Seguir comprando
      </button>

    </div>
  );
};

export default CheckoutPage;