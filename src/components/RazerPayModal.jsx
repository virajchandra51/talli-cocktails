import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, CreditCard, Building2, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './RazerPayModal.css';

const RazerPayModal = () => {
  const { razerPayActive, setRazerPayActive, setCheckoutState, pricing } = useCart();
  const [payState, setPayState] = useState('IDLE'); // IDLE, PROCESSING
  const [activeTab, setActiveTab] = useState('UPI');

  if (!razerPayActive) return null;

  const handlePay = () => {
    setPayState('PROCESSING');
    setTimeout(() => {
      setRazerPayActive(false);
      setPayState('IDLE');
      setCheckoutState('SUCCESS'); // Show the order placed screen
    }, 2500);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="razer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="razer-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="razer-header">
            <div className="razer-brand">
              <div className="razer-logo-small">P</div>
              <span>RazerPay Checkout</span>
            </div>
            <button className="btn-close-razer" onClick={() => setRazerPayActive(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="razer-amount">
            <span className="label">Amount to Pay</span>
            <span className="value">₹{pricing.total}</span>
          </div>

          <div className="razer-tabs">
            <button 
              className={activeTab === 'UPI' ? 'active' : ''} 
              onClick={() => setActiveTab('UPI')}
            >
              <Smartphone size={18} /> UPI
            </button>
            <button 
              className={activeTab === 'CARD' ? 'active' : ''} 
              onClick={() => setActiveTab('CARD')}
            >
              <CreditCard size={18} /> Card
            </button>
            <button 
              className={activeTab === 'NET' ? 'active' : ''} 
              onClick={() => setActiveTab('NET')}
            >
              <Building2 size={18} /> Netbanking
            </button>
          </div>

          <div className="razer-body">
            {payState === 'PROCESSING' ? (
              <div className="razer-processing">
                <Loader2 size={48} className="spinner" />
                <p>Talking to your bank...</p>
              </div>
            ) : (
              <div className="razer-method-info">
                {activeTab === 'UPI' && (
                  <div className="upi-input">
                    <input type="text" placeholder="Enter UPI ID (e.g. user@okhdfc)" />
                    <button className="btn-verify">Verify</button>
                  </div>
                )}
                {activeTab === 'CARD' && (
                  <div className="card-inputs">
                    <input type="text" placeholder="Card Number" />
                    <div className="row">
                      <input type="text" placeholder="Expiry (MM/YY)" />
                      <input type="password" placeholder="CVV" />
                    </div>
                  </div>
                )}
                {activeTab === 'NET' && (
                  <select className="bank-select">
                    <option>Select Bank</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                  </select>
                )}
                <div className="razer-security">
                  <ShieldCheck size={16} /> <span>100% Secure & Encrypted by RazerPay</span>
                </div>
              </div>
            )}
          </div>

          <button 
            className="btn-pay-now" 
            onClick={handlePay}
            disabled={payState === 'PROCESSING'}
          >
            {payState === 'PROCESSING' ? 'Processing...' : `Pay ₹${pricing.total}`}
          </button>

          <div className="razer-footer">
            <span>Powered by</span>
            <strong>RazerPay</strong>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RazerPayModal;
