import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList/ProductList';
import ContactForm from '../components/ContactForm/ContactForm';
import axios from 'axios';

const CatalogoPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/productos');
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <h2 className="section-title">Cargando productos...</h2>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;

  return (
    <>
      <ProductList products={products} />
      <ContactForm />
    </>
  );
};

export default CatalogoPage;