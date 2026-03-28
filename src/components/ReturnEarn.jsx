import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { flavors } from '../data';
import './ReturnEarn.css';

const ReturnEarn = () => {
  // We represent the 6 bottles as an array of color strings, or null if empty
  const [bottles, setBottles] = useState(Array(6).fill(null));
  
  const filledCount = bottles.filter(b => b !== null).length;
  const isWon = filledCount === 6;

  const handleBottleClick = (index) => {
    if (bottles[index] !== null) return; // Already filled

    // Pick a random talli color
    const randomColor = flavors[Math.floor(Math.random() * flavors.length)].color;
    
    // Update state
    setBottles(prev => {
      const next = [...prev];
      next[index] = randomColor;
      return next;
    });

    // Check if this click makes it 6/6
    if (filledCount + 1 === 6) {
      triggerConfetti();
    }
  };

  const triggerConfetti = useCallback(() => {
    var duration = 3000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  const handleStartReturn = () => {
    alert("Pickup scheduled! Our team will contact you shortly.");
  };

  return (
    <section className="return-earn-section">
      <div className="re-header">
        <h2 className="re-title">Bring It Back. Get More.</h2>
        <p className="re-sub">Sustainability never tasted this good. Return 6 empty bottles, get 1 on the house.</p>
      </div>

      <div className="re-tracker-container">
        <div className="bottles-row">
          {bottles.map((color, index) => (
            <motion.div 
              key={index}
              className={`bottle-silhouette ${color ? 'filled' : ''}`}
              onClick={() => handleBottleClick(index)}
              whileHover={!color ? { scale: 1.05 } : {}}
              whileTap={!color ? { scale: 0.95 } : {}}
            >
              {/* Bottle SVG Outline */}
              <svg viewBox="0 0 100 200" className="bottle-svg">
                <path className="bottle-outline" d="M35,20 L65,20 L65,50 L80,70 L80,180 a10,10 0 0,1 -10,10 L30,190 a10,10 0 0,1 -10,-10 L20,70 L35,50 Z" />
                <AnimatePresence>
                  {color && (
                    <motion.path 
                      className="bottle-fill"
                      d="M35,20 L65,20 L65,50 L80,70 L80,180 a10,10 0 0,1 -10,10 L30,190 a10,10 0 0,1 -10,-10 L20,70 L35,50 Z"
                      initial={{ pathLength: 0, fill: "transparent", y: 100 }}
                      animate={{ pathLength: 1, fill: color, y: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                  )}
                </AnimatePresence>
              </svg>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="progress-text"
          key={filledCount}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {filledCount} out of 6 bottles ready for exchange.
        </motion.div>

        <AnimatePresence>
          {isWon && (
            <motion.div 
              className="win-state-card"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              <h3>🎉 You’ve earned a free Talli!</h3>
              <p>Use code: <strong className="promo-code">ECOTALLI</strong> at checkout.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="re-actions">
        <button className="btn-return-primary" onClick={handleStartReturn}>
          Start a Return
        </button>
        <button className="btn-return-secondary" onClick={() => alert("Loading your recycling history...")}>
          Track My History
        </button>
      </div>
    </section>
  );
};

export default ReturnEarn;
