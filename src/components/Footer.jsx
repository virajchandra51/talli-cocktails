import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const { setActiveLegalModal } = useCart();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const socialIconVariants = {
    hover: { y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } },
  };

  return (
    <footer className="footer">
      <motion.div 
        className="footer-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <motion.div className="footer-col brand-col" variants={itemVariants}>
            <img src={logo} alt="Talli Cocktails" className="footer-logo" />
            <p className="footer-tagline">The bar, bottled.</p>
          </motion.div>

          {/* Column 2: Explore */}
          <motion.div className="footer-col" variants={itemVariants}>
            <h4>Explore</h4>
            <ul>
              <li><a href="#flavours">Flavours</a></li>
              <li><a href="#mix-lab">Mix Lab</a></li>
              <li><a href="#house-party">House Party</a></li>
              <li><a href="#return-earn">Return & Earn</a></li>
            </ul>
          </motion.div>

          {/* Column 3: Support */}
          <motion.div className="footer-col" variants={itemVariants}>
            <h4>Support</h4>
            <ul>
              <li><button className="btn-link" onClick={() => setActiveLegalModal('FAQ')}>FAQ</button></li>
              <li><button className="btn-link" onClick={() => setActiveLegalModal('TERMS')}>Terms & Conditions</button></li>
              <li><button className="btn-link" onClick={() => setActiveLegalModal('PRIVACY')}>Privacy Policy</button></li>
              <li><button className="btn-link" onClick={() => setActiveLegalModal('CANCELLATION')}>Cancellation & Refund</button></li>
              <li><button className="btn-link" onClick={() => setActiveLegalModal('SHIPPING')}>Shipping Policy</button></li>
              <li><a href="mailto:tribe@talli.com">Contact</a></li>
            </ul>
          </motion.div>

          {/* Column 4: Socials */}
          <motion.div className="footer-col socials-col" variants={itemVariants}>
            <h4>Socials</h4>
            <div className="social-links">
              <motion.a href="#" variants={socialIconVariants} whileHover="hover"><Instagram size={24} /></motion.a>
              <motion.a href="#" variants={socialIconVariants} whileHover="hover"><Twitter size={24} /></motion.a>
              <motion.a href="#" variants={socialIconVariants} whileHover="hover"><Linkedin size={24} /></motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div className="footer-bottom" variants={itemVariants}>
          <div className="compliance-bar">
            <span>Must be 25+ to purchase. Please drink responsibly.</span>
            <span>Made with ❤️ for the Talli Tribe</span>
          </div>
          <div className="payment-icons-footer grayscale">
            <div className="p-icon visa" />
            <div className="p-icon mastercard" />
            <div className="p-icon upi" />
            <div className="p-icon razerpay" />
          </div>
          <div className="responsible-drinking-disclaimer">
            <p><strong>RESPONSIBLE DRINKING DISCLAIMER:</strong> Alcohol consumption is injurious to health. Please drink responsibly and do not drink and drive. Talli Cocktails is intended only for legal drinking age adults.</p>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} Talli Cocktails. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
