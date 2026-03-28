import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState('IDLE'); // IDLE, VERIFYING, SUCCESS
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'FAQ', 'TERMS', 'PRIVACY', or null
  const [razerPayActive, setRazerPayActive] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState('Deliver Now');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const GST_RATE = 0.18;
  const CESS_RATE = 0.012;
  const MIN_ORDER = 500;
  const FREE_DELIVERY_THRESHOLD = 999;
  const DELIVERY_FEE = 50;

  const [pendingProduct, setPendingProduct] = useState(null);

  const addItem = (product, triggerHydration = true) => {
    // If it's a cocktail and we want to trigger hydration, don't add yet
    if (triggerHydration && product.id !== 'water') {
      setPendingProduct(product);
      return;
    }

    setItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Only auto-open cart if it wasn't a hydration trigger
    if (!triggerHydration || product.id === 'water') {
      setIsCartOpen(true);
    }
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setItems((prev) => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0)); // Remove if quantity drops to 0
  };

  const clearCart = () => {
    setItems([]);
    setIsCartOpen(false);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const applyCoupon = (code) => {
    if (code.toUpperCase() === 'FIRSTSIP') {
      setDiscountApplied(true);
      return true;
    }
    return false;
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * GST_RATE);
  const cess = Math.round(subtotal * CESS_RATE);
  const needsDeliveryFee = subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD;
  const deliveryFee = needsDeliveryFee ? DELIVERY_FEE : 0;
  const discount = discountApplied ? 50 : 0;
  const total = Math.max(0, subtotal + gst + cess + deliveryFee - discount);
  const minOrderRemaining = Math.max(0, MIN_ORDER - subtotal);
  const isMinOrderMet = subtotal >= MIN_ORDER;

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      checkoutState,
      setCheckoutState,
      clearCart,
      activeLegalModal,
      setActiveLegalModal,
      razerPayActive,
      setRazerPayActive,
      deliverySlot,
      setDeliverySlot,
      deliveryInstructions,
      setDeliveryInstructions,
      pendingProduct,
      setPendingProduct,
      couponCode,
      setCouponCode,
      discountApplied,
      applyCoupon,
      pricing: {
        subtotal,
        gst,
        cess,
        deliveryFee,
        discount,
        total,
        minOrderRemaining,
        isMinOrderMet,
        FREE_DELIVERY_THRESHOLD
      }
    }}>
      {children}
    </CartContext.Provider>
  );
};
