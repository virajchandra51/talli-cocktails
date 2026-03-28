import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DrinkModal from './DrinkModal';
import { useCart } from '../context/CartContext';
import { flavors } from '../data';
import './FlavourCarousel.css';

const FlavourCarousel = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
  // States
  const [activeBg, setActiveBg] = useState(flavors[0].color);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  // Use scroll position of the horizontal carousel
  const { scrollXProgress } = useScroll({
    container: scrollRef
  });

  // Map scroll progress [0 to 1] to the background colors
  const sectionBackgroundColor = useTransform(
    scrollXProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    flavors.map(f => f.color)
  );

  const { addItem } = useCart();

  // Handlers
  const handleAddToCart = (flavor) => {
    addItem(flavor);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <motion.section 
        id="flavours" 
        className="carousel-section"
        style={{ backgroundColor: sectionBackgroundColor }}
      >
        <div className="carousel-header">
          <h2 className="carousel-title">Pick Your Talli</h2>
          <p className="carousel-subtitle">Six distinct cocktails. Zero effort.</p>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-scroll-container" ref={scrollRef}>
            {flavors.map((flavor) => (
              <div key={flavor.id} className="flavor-card">
                <div className="card-image-wrap">
                  <img src={flavor.img} alt={flavor.name} className="card-bottle" />
                </div>
                <div className="card-content">
                  <div className="card-header-row">
                    <h3 className="flavor-name">{flavor.name}</h3>
                    <span className="taste-tag">{flavor.profile}</span>
                  </div>
                  
                  <div className="card-desc">{flavor.desc}</div>
                  <div className="card-ingredients">
                    <strong>Ingredients:</strong> {flavor.ingredients.split(',')[0]}...
                  </div>

                  <div className="card-spacer"></div>

                  <div className="card-price-row">
                    <span className="card-price">₹349</span>
                    <span className="card-vol"> | 250ml | 15% Alc./Vol.</span>
                  </div>
                  
                  <div className="card-buttons">
                    <button className="add-to-night-btn" onClick={() => handleAddToCart(flavor)}>
                      Add to Night
                    </button>
                    <button 
                      className="view-drink-btn" 
                      onClick={() => navigate(`/product/${flavor.id}`)}
                    >
                      View Drink
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="carousel-spacer"></div>
          </div>
        </div>

        <AnimatePresence>
          {showToast && (
            <motion.div 
              className="success-toast"
              initial={{ opacity: 0, y: 50, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 50, x: "-50%" }}
            >
              🎉 Added to your night!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      <DrinkModal 
        isOpen={!!selectedDrink} 
        onClose={() => setSelectedDrink(null)} 
        drink={selectedDrink} 
      />
    </>
  );
};

export default FlavourCarousel;
