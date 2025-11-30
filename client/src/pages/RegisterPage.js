import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/ContactForm/ContactForm.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/perfil');
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="contact-form-container">
      <h3 className="form-title">Crear Cuenta</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        
        <input type="text" name="name" placeholder="Nombre Completo" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña (mín 6 caracteres)" value={formData.password} onChange={handleChange} required />
        
        <button type="submit" className="cta-button">Registrarse</button>
        
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;