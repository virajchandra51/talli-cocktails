import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${showPulse ? 'with-pulse' : 'no-pulse'}`}>
      {showPulse && (
        <div className="availability-pulse">
          <div className="pulse-dot" />
          <span>Checking availability in your area...</span>
        </div>
      )}
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/">
            <img src={logo} alt="Talli Cocktails" className="logo-img" />
          </a>
        </div>
        
        <div className="nav-links">
          <a href="#flavours">Get Talli</a>
          <a href="#flavours">Flavours</a>
          <a href="#mix-lab">Mix Lab</a>
          <a href="#house-party">House Party</a>
          <a href="#return-earn">Return & Earn</a>
          <a href="#talli-stories">Talli Stories</a>
          <a href="#find-talli">Find Talli</a>
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <span>Your Night ({cartCount})</span>
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
