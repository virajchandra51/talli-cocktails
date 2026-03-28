import React from 'react';
import { motion } from 'framer-motion';
import './FinalCTA.css';

const FinalCTA = () => {
  return (
    <section className="final-cta">
      <div className="cta-container">
        <motion.h2 
          className="cta-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The night doesn’t wait.
        </motion.h2>
        <motion.p 
          className="cta-subtext"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Good drinks don’t need a bartender. The bar just got bottled.
        </motion.p>
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a href="#flavours" className="btn-cta-primary">Get Talli</a>
          <a href="#flavours" className="btn-cta-outline">Start the Night</a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
