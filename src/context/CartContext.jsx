import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load initial cart from local storage if desired, but for now memory state is fine
  // or simple local storage to persist across reloads
  useEffect(() => {
    const savedCart = localStorage.getItem('dmar_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dmar_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      // Check if exact same item (same id, toppings, instructions) exists
      // For simplicity, we just add as a new item or if we want we can generate a unique cart item ID
      return [...prev, { ...item, cartId: Date.now().toString() }];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('dmar_cart');
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemBase = item.price;
      const toppingsTotal = item.selectedToppings ? item.selectedToppings.reduce((sum, t) => sum + t.price, 0) : 0;
      const fbtTotal = item.selectedFbt ? item.selectedFbt.reduce((sum, f) => sum + f.price, 0) : 0;
      return total + ((itemBase + toppingsTotal + fbtTotal) * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
