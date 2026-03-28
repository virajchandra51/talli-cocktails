import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { flavors } from '../data';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const flavor = flavors.find(f => String(f.id) === id);

  if (!flavor) {
    return (
      <div className="product-page-not-found">
        <h2>Drink Not Found</h2>
        <button className="btn-back" onClick={() => navigate('/')}>Back Home</button>
      </div>
    );
  }

  // Bar animation variants
  const barVars = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level * 20}%`,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
    })
  };

  return (
    <div className="product-page" style={{ backgroundColor: flavor.color }}>
      <div className="product-page-nav">
        <button className="btn-back-home" onClick={() => navigate('/')}>
          ← Back to Flavours
        </button>
      </div>

      <div className="product-container">
        {/* Left Side: Massive Image */}
        <motion.div 
          className="product-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={flavor.img} alt={flavor.name} className="product-hero-image" />
        </motion.div>

        {/* Right Side: Details */}
        <div className="product-details">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="product-title">{flavor.name}</h1>
            <p className="product-profile-tag">{flavor.profile}</p>
            <p className="product-desc">{flavor.desc}</p>

            <div className="detail-section">
              <h3 className="detail-heading">Ingredients</h3>
              <p className="detail-text">{flavor.ingredients}</p>
            </div>

            <div className="detail-section">
              <h3 className="detail-heading">Taste Profile</h3>
              <div className="taste-scales">
                {Object.entries(flavor.scales).map(([trait, level], index) => (
                  <div key={trait} className="taste-row">
                    <span className="taste-label capitalize">{trait}</span>
                    <div className="taste-bar-bg">
                      <motion.div 
                        className="taste-bar-fill"
                        custom={level}
                        variants={barVars}
                        initial="hidden"
                        animate="visible"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-grid">
              <div className="detail-section">
                <h3 className="detail-heading">Perfect For</h3>
                <p className="detail-text">{flavor.occasions}</p>
              </div>
              <div className="detail-section">
                <h3 className="detail-heading">Best Paired With</h3>
                <p className="detail-text">{flavor.pairings}</p>
              </div>
            </div>

            <button className="btn-add-massive" onClick={() => addItem(flavor)}>
              Add to Night — ₹349
            </button>
            
            <p className="responsible-drinking-product">
              <strong>RESPONSIBLE DRINKING:</strong> Alcohol consumption is injurious to health. Please drink responsibly and do not drink and drive.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
