import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './LegalOverlay.css';

const LegalOverlay = () => {
  const { activeLegalModal, setActiveLegalModal } = useCart();

  if (!activeLegalModal) return null;

  const content = {
    FAQ: {
      title: 'Frequently Asked Questions',
      sections: [
        { q: 'What is the delivery time?', a: 'We typically deliver within 1-2 hours depending on your location and traffic.' },
        { q: 'What is the return policy?', a: 'Return 6 empty Talli bottles and get 1 bottle free; you must have previously bought at least 3 bottles from us.' },
        { q: 'Are the drinks pre-mixed?', a: 'Yes, our cocktails are expertly pre-mixed and ready to pour over ice.' }
      ]
    },
    TERMS: {
      title: 'Terms & Conditions',
      body: [
        'Must be 25+ to order. Age verification is mandatory at delivery.',
        'Enjoy responsibly. Do not drink and drive.',
        'Orders once placed can only be cancelled within 5 minutes.',
        'Talli Cocktails reserves the right to refuse service to intoxicated individuals.'
      ]
    },
    PRIVACY: {
      title: 'Privacy Policy',
      body: [
        'Your data is safe with the Talli Tribe. We use industry-standard encryption.',
        'We only collect data necessary to fulfill your orders and improve the cocktail experience.',
        'We never sell your personal information to third parties.',
        'Cookies are used only for session management and cart persistence.'
      ]
    },
    CANCELLATION: {
      title: 'Cancellation & Refund',
      body: [
        'Cancellations are allowed within 5 minutes of placing an order.',
        'Refunds for eligible cancellations are processed within 3-5 business days to your original payment method.',
        'If you receive a damaged bottle, please contact tribe@talli.com immediately with photos.'
      ]
    },
    SHIPPING: {
      title: 'Shipping Policy',
      body: [
        'We currently deliver in Gurgaon only.',
        'Our standard delivery time is 1-2 hours.',
        'All orders are handled by our trained Talli riders to ensure perfect temperature control.',
        'Delivery fees are based on your order value: Free for orders above ₹999, ₹50 otherwise.'
      ]
    }
  };

  const activeContent = content[activeLegalModal] || content.FAQ;

  return (
    <AnimatePresence>
      <motion.div 
        className="legal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="legal-modal"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <button className="btn-close-legal" onClick={() => setActiveLegalModal(null)}>
            <X size={32} />
          </button>
          
          <div className="legal-scroll">
            <h2>{activeContent.title}</h2>
            
            {activeLegalModal === 'FAQ' ? (
              <div className="faq-list">
                {activeContent.sections.map((item, index) => (
                  <div key={index} className="faq-item">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="legal-text-body">
                {activeContent.body.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            )}
            
            <div className="legal-footer">
              <p>Last updated: March 2026</p>
              <button className="btn-done" onClick={() => setActiveLegalModal(null)}>I Understand</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LegalOverlay;
