import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, 
    checkoutState, pricing, deliverySlot, setDeliverySlot, 
    deliveryInstructions, setDeliveryInstructions, setRazerPayActive,
    couponCode, setCouponCode, applyCoupon
  } = useCart();

  // Lock body scroll when cart is open so mouse wheel stays inside the drawer
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const handleApplyCoupon = () => {
    const success = applyCoupon(couponCode);
    if (!success) {
      alert("Invalid Code.");
    }
  };

  const handleCheckout = () => {
    if (pricing.isMinOrderMet) {
      setRazerPayActive(true);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h3>Your Night</h3>
              <button className="btn-close-cart" onClick={() => setIsCartOpen(false)}>×</button>
            </div>

            <div className="cart-content">
              {!pricing.isMinOrderMet && items.length > 0 && (
                <div className="min-order-warning">
                  Add <strong>₹{pricing.minOrderRemaining}</strong> more to checkout.
                </div>
              )}

              {items.length === 0 ? (
                <div className="empty-cart">
                  <p>No selections yet. The night is young.</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {items.map(item => (
                      <div key={item.id} className="cart-item">
                        <div className="item-img" style={{ backgroundImage: `url(${item.image})` }} />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p>₹{item.price} / 250ml</p>
                          <button className="btn-remove" onClick={() => removeItem(item.id)}>Remove from Night</button>
                        </div>
                        <div className="item-controls">
                          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="delivery-customization">
                    <div className="delivery-field">
                      <label>Delivery Slot</label>
                      <select 
                        value={deliverySlot} 
                        onChange={(e) => setDeliverySlot(e.target.value)}
                      >
                        <option>Deliver Now</option>
                        <option>Evening (6 PM - 9 PM)</option>
                        <option>Late Night (9 PM - 12 AM)</option>
                      </select>
                    </div>
                    <div className="delivery-field">
                      <label>Instructions</label>
                      <textarea 
                        placeholder="Add delivery instructions (e.g., Leave at gate)"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="coupon-section">
                  <input 
                    type="text" 
                    placeholder="Got a Code?" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={handleApplyCoupon}>Apply</button>
                </div>
                {pricing.discount > 0 && <p className="coupon-success">Deal applied successfully! 🎉</p>}

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{pricing.subtotal}</span>
                  </div>
                  <div className="summary-row small">
                    <span>GST (18%)</span>
                    <span>₹{pricing.gst}</span>
                  </div>
                  <div className="summary-row small">
                    <span>Cess (1.2%)</span>
                    <span>₹{pricing.cess}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span className={pricing.deliveryFee === 0 ? 'free' : ''}>
                      {pricing.deliveryFee === 0 ? 'FREE' : `₹${pricing.deliveryFee}`}
                    </span>
                  </div>
                  {pricing.discount > 0 && (
                    <div className="summary-row discount">
                      <span>Discount (FIRSTSIP)</span>
                      <span>-₹{pricing.discount}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Final Total</span>
                    <span>₹{pricing.total}</span>
                  </div>
                </div>

                <div className="security-badges-row">
                  <div className="ssl-badge">
                    <div className="lock-icon" /> 100% Secure SSL Encrypted
                  </div>
                  <div className="payment-icons-footer grayscale">
                    <div className="p-icon visa" />
                    <div className="p-icon mastercard" />
                    <div className="p-icon upi" />
                    <div className="p-icon razerpay" />
                  </div>
                </div>

                <motion.button 
                  className="btn-checkout"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCheckout}
                  disabled={!pricing.isMinOrderMet || checkoutState === 'VERIFYING'}
                >
                  {pricing.isMinOrderMet ? 'Lock It In' : `Add ₹${pricing.minOrderRemaining} More`}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
