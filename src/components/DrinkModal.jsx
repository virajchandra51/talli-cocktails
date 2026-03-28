import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './DrinkModal.css';

const TasteBar = ({ label, value }) => (
  <div className="taste-bar-container">
    <span className="taste-label">{label}</span>
    <div className="taste-track">
      {[1, 2, 3, 4, 5].map((level) => (
        <motion.div 
          key={level} 
          className={`taste-segment ${level <= value ? 'active' : ''}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: level * 0.1, duration: 0.3 }}
        />
      ))}
    </div>
  </div>
);

const DrinkModal = ({ isOpen, onClose, drink }) => {
  if (!drink) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="drink-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backgroundColor: `${drink.color}F2` }} // Adds slight transparency
        >
          <motion.div 
            className="drink-modal-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className="close-modal-btn" onClick={onClose}>
              <X size={24} />
            </button>
            
            <div className="modal-grid">
              <div className="modal-bottle-col">
                <img src={drink.img} alt={drink.name} className="modal-bottle-img" />
              </div>
              
              <div className="modal-details-col">
                <span className="modal-taste-tag">{drink.profile}</span>
                <h2 className="modal-title">{drink.name}</h2>
                <p className="modal-desc">{drink.desc}</p>
                
                <div className="modal-section">
                  <h3>Key Ingredients</h3>
                  <p>{drink.ingredients}</p>
                </div>

                <div className="modal-section taste-profile-sec">
                  <h3>Taste Profile</h3>
                  <TasteBar label="Sweet" value={drink.scales.sweet} />
                  <TasteBar label="Bitter" value={drink.scales.bitter} />
                  <TasteBar label="Spicy" value={drink.scales.spicy} />
                </div>

                <div className="modal-row-split">
                  <div className="modal-section">
                    <h3>Perfect For</h3>
                    <p>{drink.occasions}</p>
                  </div>
                  <div className="modal-section">
                    <h3>Pairs Well With</h3>
                    <p>{drink.pairings}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DrinkModal;
