import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext'; 
import { useCart } from '../../context/CartContext'; 
import LogoutButton from '../LogoutButton'; 

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    const destination = getCartCount() > 0 ? "/checkout" : "/productos";
    navigate(destination);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Mueblería Jota</Link>
        </div>
        <nav className="navbar-nav">
          <Link to="/productos">Catálogo</Link>
          <Link to="/admin/crear-producto">Crear Producto</Link> 
          
          {isAuthenticated ? (
            <>
              <Link to="/perfil">Mi Perfil ({user.name.split(' ')[0]})</Link>
              <LogoutButton className="navbar-nav-item" /> 
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registro</Link>
            </>
          )}
        </nav>
        
        <div 
          className="navbar-cart" 
          onClick={handleCartClick}
          style={{ cursor: 'pointer' }} 
        >
          <span>🛒 Carrito ({getCartCount()})</span> 
        </div>
      </div>
    </header>
  );
};

export default Navbar;