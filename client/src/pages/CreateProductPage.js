import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/ContactForm/ContactForm.css';
import axios from 'axios';

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagenUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.nombre) tempErrors.nombre = "El nombre es obligatorio";
    if (parseFloat(formData.precio) <= 0) tempErrors.precio = "El precio debe ser mayor a 0";
    if (parseInt(formData.stock) < 0) tempErrors.stock = "El stock no puede ser negativo";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post('/api/productos', {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock) || 0
      });

      const nuevoProducto = response.data;
      alert('¡Producto creado exitosamente!');
      navigate(`/productos/${nuevoProducto._id}`);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || err.message || 'No se pudo crear el producto' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h3 className="form-title">Crear Nuevo Producto</h3>
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        
        <input type="text" name="nombre" placeholder="Nombre del Producto" value={formData.nombre} onChange={handleChange} />
        {errors.nombre && <p className="error-text">{errors.nombre}</p>}
        
        <textarea name="descripcion" placeholder="Descripción" rows="3" value={formData.descripcion} onChange={handleChange}></textarea>
        
        <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} min="0" />
        {errors.precio && <p className="error-text">{errors.precio}</p>}
        
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} min="0" />
        {errors.stock && <p className="error-text">{errors.stock}</p>}
        
        <input type="text" name="imagenUrl" placeholder="URL de la Imagen (ej: /media/foto.png)" value={formData.imagenUrl} onChange={handleChange} />
        
        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
        {errors.api && <p className="error-text">{errors.api}</p>}
      </form>
    </div>
  );
};

export default CreateProductPage;