import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../components/ContactForm/ContactForm.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData.email, formData.password);
      navigate('/perfil');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas');
    }
  };

  return (
    <div className="contact-form-container">
      <h3 className="form-title">Iniciar Sesión</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        
        <button type="submit" className="cta-button">Ingresar</button>
        
        {error && <p className="error-text">{error}</p>}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿No tienes cuenta? <a href="/registro" style={{ color: 'var(--color-siena-tostado)' }}>Regístrate aquí</a>.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;