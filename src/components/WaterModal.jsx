import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import waterImg from '../assets/water.jpeg';
import './WaterModal.css';

const WaterModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="water-modal-overlay">
        <motion.div 
          className="water-modal-content"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="water-modal-image">
            <img src={waterImg} alt="Drinking Water" />
          </div>
          
          <div className="water-modal-details">
            <h2 className="water-title">Stay Balanced</h2>
            <p className="water-text">Hydration complements consumption. Add a 1L water bottle to your order?</p>
            <p className="water-price">₹25</p>
            
            <div className="water-actions">
              <button 
                className="btn-add-water" 
                onClick={() => {
                  onConfirm(true); 
                  onClose();
                }}
              >
                Yes, add water
              </button>
              <button 
                className="btn-skip-water" 
                onClick={() => {
                  onConfirm(false);
                  onClose();
                }}
              >
                No thanks, just the drink
              </button>
            </div>
          </div>
          
          <button className="btn-close-modal" onClick={onClose}>×</button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WaterModal;
