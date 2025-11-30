import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton = ({ className }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('Sesión cerrada exitosamente.');
    navigate('/');
  };

  return (
    <a onClick={handleLogout} className={className} style={{ cursor: 'pointer' }}>
      Logout
    </a>
  );
};

export default LogoutButton;