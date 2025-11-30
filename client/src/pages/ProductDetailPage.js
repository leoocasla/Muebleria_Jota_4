import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import ContactForm from '../components/ContactForm/ContactForm';
import { useCart } from '../context/CartContext'; 
import axios from 'axios';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/productos/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${product.nombre}"?`)) {
      return;
    }
    try {
      await axios.delete(`/api/productos/${id}`);
      alert('Producto eliminado exitosamente');
      navigate('/productos');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddToCartClick = () => {
    if (product) {
        addToCart(product); 
        alert(`${product.nombre} añadido al carrito!`);
    }
  };

  if (loading) return <h2 className="section-title">Cargando producto...</h2>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <>
      <button onClick={() => navigate('/productos')} className="back-button">
        ← Volver al catálogo
      </button>

      <ProductDetail 
        product={product} 
        onDelete={handleDelete}
        onAddToCart={handleAddToCartClick}
      />

      <ContactForm />
    </>
  );
};

export default ProductDetailPage;