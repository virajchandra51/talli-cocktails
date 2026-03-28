import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './HouseParty.css';

const vibes = [
  { id: 'light', label: 'Light Sip', duration: '(1.5h)', mult: 1 },
  { id: 'social', label: 'Social Buzz', duration: '(3h)', mult: 2 },
  { id: 'full', label: 'Full Send', duration: '(All Night)', mult: 3 }
];

const HouseParty = () => {
  const [guests, setGuests] = useState(5);
  const [vibe, setVibe] = useState(vibes[1]);
  const [showNotification, setShowNotification] = useState(false);
  const { addItem, setIsCartOpen } = useCart();

  const totalBottles = guests * vibe.mult;
  const freeBottles = Math.floor(totalBottles / 12) * 2;
  const originalPrice = totalBottles * 349;
  const discountPrice = (totalBottles - freeBottles) * 349;

  const handleIncrement = () => setGuests(prev => Math.min(prev + 1, 100));
  const handleDecrement = () => setGuests(prev => Math.max(prev - 1, 2));

  const handleNotify = () => {
    addItem({
      id: `party-pack-${totalBottles}`,
      name: `Talli Party Pack (${totalBottles} Bottles)`,
      price: discountPrice,
      image: 'https://images.unsplash.com/photo-1597075702185-24bc99f018e6?auto=format&fit=crop&q=80&w=400',
      quantity: 1
    }, false); // No hydration for bulk
    
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setIsCartOpen(true);
    }, 1500);
  };

  return (
    <section className="house-party-section" id="house-party">
      <div className="hp-header">
        <h2 className="hp-title">House Party, <span className="neon-pink">Sorted</span></h2>
        <p className="hp-sub">Stop the math. We’ve got the bottles.</p>
      </div>

      <div className="hp-calculator-card">
        {/* Left Side: Controls */}
        <div className="hp-controls">
          <div className="control-group">
            <h3 className="control-label">Guest Count</h3>
            <div className="guest-counter">
              <button className="btn-counter" onClick={handleDecrement}>-</button>
              <motion.div 
                key={guests}
                initial={{ scale: 1.5, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="guest-number"
              >
                {guests}
              </motion.div>
              <button className="btn-counter" onClick={handleIncrement}>+</button>
            </div>
          </div>

          <div className="control-group">
            <h3 className="control-label">The Vibe</h3>
            <div className="vibe-selector">
              {vibes.map(v => (
                <button 
                  key={v.id}
                  className={`btn-vibe ${vibe.id === v.id ? 'active' : ''}`}
                  onClick={() => setVibe(v)}
                >
                  <span className="vibe-label">{v.label}</span>
                  <span className="vibe-duration">{v.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="hp-results">
          <h3 className="result-label">Recommended Pack</h3>
          
          <motion.div 
            className="total-bottles"
            key={totalBottles}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {totalBottles} <span className="bottle-text">Bottles</span>
          </motion.div>
          
          <p className="mix-info">A perfectly balanced mix of all 6 Talli flavors.</p>

          <div className="pricing-info">
            {freeBottles > 0 && (
              <div className="savings-badge">
                <span className="neon-green">Buy 10, Get {freeBottles} Free!</span>
              </div>
            )}
            <div className="price-display">
              {freeBottles > 0 && (
                <span className="original-price">₹{originalPrice.toLocaleString()}</span>
              )}
              <span className="discount-price">₹{discountPrice.toLocaleString()}</span>
            </div>
          </div>

          <button className="btn-get-pack" onClick={handleNotify}>Get Party Pack</button>

          <AnimatePresence>
            {showNotification && (
              <motion.div 
                className="hp-notification"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
              >
                🎉 Party added to your night!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HouseParty;
