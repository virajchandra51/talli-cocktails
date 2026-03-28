import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AgeGate.css';

const AgeGate = ({ isVerified, onVerified }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVerified) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVerified]);

  const handleYes = () => {
    setIsVisible(false);
    if (onVerified) {
      setTimeout(onVerified, 400); // fire after exit animation matches duration
    }
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="age-gate-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="age-gate-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2>Are you 25+?</h2>
            <p>You must be of legal drinking age to enter.</p>
            <div className="age-gate-buttons">
              <button className="btn-primary" onClick={handleYes}>Hell Yeah</button>
              <button className="btn-secondary" onClick={handleNo}>Not Yet</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeGate;
