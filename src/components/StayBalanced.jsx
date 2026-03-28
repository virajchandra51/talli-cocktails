import { motion } from 'framer-motion';
import waterImg from '../assets/water.jpeg';
import './StayBalanced.css';

const StayBalanced = ({ onAddWater }) => {
  return (
    <section className="stay-balanced-section">
      <div className="balanced-container">
        <div className="balanced-content">
          <h2 className="balanced-title">Stay Balanced</h2>
          <p className="balanced-text">
            Hydration complements consumption and ensures a balanced experience.
          </p>
          
          <div className="balanced-product">
            <div className="water-info">
              <h3>Drinking Water (1L)</h3>
              <p className="price">₹25</p>
            </div>
            
            <div className="water-actions">
              <button className="btn-balanced-add" onClick={onAddWater}>
                Add to Order
              </button>
              <button className="btn-balanced-sane" onClick={onAddWater}>
                Keep Me Sane
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          className="sb-bottle-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={waterImg} alt="Stay Balanced Water" className="sb-bottle-image" />
        </motion.div>
      </div>
    </section>
  );
};

export default StayBalanced;
