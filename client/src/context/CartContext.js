import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product._id === product._id);

      if (existingItem) {
        return prevItems.map(item =>
          item.product._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, qty: 1 }];
      }
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((acc, item) => acc + item.qty, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.product.precio * item.qty, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, getCartCount, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);