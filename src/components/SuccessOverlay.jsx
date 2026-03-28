import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './SuccessOverlay.css';

const SuccessOverlay = () => {
  const { checkoutState, setCheckoutState, clearCart } = useCart();

  if (checkoutState !== 'SUCCESS') return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="checkout-success-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="success-content"
          initial={{ scale: 0.8, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
        >
          <div className="success-emoji">🎉</div>
          <h2>Order Placed!</h2>
          <p className="success-order-id">Order #TALLI001</p>
          <p>See you soon. The night just got better.</p>
          <div className="fulfillment-text">
            <p>Receipt sent to your email. Tracking link sent via SMS.</p>
          </div>
          <button className="btn-done-success" onClick={() => {
            setCheckoutState('IDLE');
            clearCart();
          }}>
            ← Back to the Tribe
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessOverlay;
