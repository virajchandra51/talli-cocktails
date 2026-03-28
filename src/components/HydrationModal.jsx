import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './HydrationModal.css';

const HydrationModal = () => {
  const { pendingProduct, setPendingProduct, addItem, setIsCartOpen } = useCart();

  if (!pendingProduct) return null;

  const handleChoice = (addWater) => {
    // Add the main product
    addItem(pendingProduct, false); // Don't trigger modal again

    if (addWater) {
      // Add Himalayan Water
      addItem({
        id: 'water',
        name: 'Talli Himalayan Water',
        price: 49,
        image: 'https://images.unsplash.com/photo-1559839914-17aae19cea9e?auto=format&fit=crop&q=80&w=400',
        quantity: 1
      }, false);
    }

    setPendingProduct(null);
    setIsCartOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="hydration-overlay">
        <motion.div 
          className="hydration-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="hydration-content">
            <span className="badge">Pro Tip</span>
            <h2>Stay Balanced?</h2>
            <p>Add a Talli Himalayan Water for ₹49. Your future self will thank you. 💧</p>
            
            <div className="hydration-options">
              <button className="btn-add-water" onClick={() => handleChoice(true)}>
                Add Water (+₹49)
              </button>
              <button className="btn-no-water" onClick={() => handleChoice(false)}>
                No, I'm a pro
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HydrationModal;
