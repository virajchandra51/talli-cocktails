import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { flavors } from '../data';
import './MixLab.css';

const vibes = [
  { id: 'party', label: 'Wild House Party', emoji: '🏠' },
  { id: 'date', label: 'Cozy Date Night', emoji: '✨' },
  { id: 'reset', label: 'Post-Work Reset', emoji: '☕' },
  { id: 'beach', label: 'Beachside Sundowner', emoji: '🌊' }
];

const tastes = [
  { id: 'sweet', label: 'Sweet & Floral', emoji: '🌸' },
  { id: 'spicy', label: 'Spicy & Bold', emoji: '🌶️' },
  { id: 'smokey', label: 'Smokey & Strong', emoji: '🥃' },
  { id: 'tangy', label: 'Tangy & Experimental', emoji: '🍇' }
];

const MixLab = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({ vibe: null, taste: null });
  const [resultId, setResultId] = useState(null);

  const calculateMatch = (vibe, taste) => {
    // Hardcoded logic to ensure all 6 are possible outcomes
    if (vibe === 'party' && taste === 'spicy') return 6; // Chilli Cha Cha
    if (vibe === 'party' && taste === 'tangy') return 3; // Jamun Jhatka
    if (vibe === 'date' && taste === 'sweet') return 1; // Gulabi Ishq
    if (vibe === 'date' && taste === 'smokey') return 4; // Smokey Shole
    if (vibe === 'beach' && taste === 'tangy') return 5; // Goa Garam
    if (vibe === 'reset' && taste === 'smokey') return 2; // Kaapi Kick
    
    // Fallbacks
    if (taste === 'spicy') return 6;
    if (taste === 'sweet') return 1;
    if (taste === 'smokey') return 4;
    if (taste === 'tangy') return 3;
    if (vibe === 'beach') return 5;
    if (vibe === 'reset') return 2;
    return 1;
  };

  const selectVibe = (id) => {
    setSelections({ ...selections, vibe: id });
    setTimeout(() => setStep(2), 300);
  };

  const selectTaste = (id) => {
    setSelections({ ...selections, taste: id });
    setStep(3);
  };

  useEffect(() => {
    if (step === 3) {
      const match = calculateMatch(selections.vibe, selections.taste);
      setTimeout(() => {
        setResultId(match);
        setStep(4);
      }, 2500); // 2.5 seconds mixing animation
    }
  }, [step, selections]);

  const resetQuiz = () => {
    setSelections({ vibe: null, taste: null });
    setResultId(null);
    setStep(1);
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <motion.div 
          key="step1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="quiz-step"
        >
          <h3 className="quiz-prompt">Step 1: Choose your vibe</h3>
          <div className="quiz-grid">
            {vibes.map(v => (
              <motion.button 
                key={v.id}
                whileTap={{ scale: 0.95 }}
                className={`quiz-card ${selections.vibe === v.id ? 'active' : ''}`}
                onClick={() => selectVibe(v.id)}
              >
                <span className="quiz-emoji">{v.emoji}</span>
                <span className="quiz-label">{v.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      );
    }

    if (step === 2) {
      return (
        <motion.div 
          key="step2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="quiz-step"
        >
          <h3 className="quiz-prompt">Step 2: Craving a taste?</h3>
          <div className="quiz-grid">
            {tastes.map(t => (
              <motion.button 
                key={t.id}
                whileTap={{ scale: 0.95 }}
                className={`quiz-card ${selections.taste === t.id ? 'active' : ''}`}
                onClick={() => selectTaste(t.id)}
              >
                <span className="quiz-emoji">{t.emoji}</span>
                <span className="quiz-label">{t.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      );
    }

    if (step === 3) {
      return (
        <motion.div 
          key="step3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="mixing-state"
        >
          <motion.div 
            animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="shaker-icon"
          >
            🍹
          </motion.div>
          <h3 className="mixing-text">Analyzing your palate...</h3>
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "linear" }}
            />
          </div>
        </motion.div>
      );
    }

    if (step === 4) {
      const product = flavors.find(f => f.id === resultId);
      return (
        <motion.div 
          key="step4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="result-card"
          style={{ '--result-color': product.color }}
        >
          <h2 className="result-header">Perfect Match Found!</h2>
          
          <div className="result-body">
            <img src={product.img} alt={product.name} className="result-bottle" />
            <div className="result-info">
              <h3 className="result-title">{product.name}</h3>
              <p className="result-why">Because you selected <strong>{vibes.find(v=>v.id===selections.vibe).label}</strong> with a crave for <strong>{tastes.find(t=>t.id===selections.taste).label}</strong>.</p>
              
              <div className="result-actions">
                <button className="btn-result-add" onClick={() => addItem(product)}>Add to Night</button>
                <button className="btn-result-view" onClick={() => navigate(`/product/${product.id}`)}>Details</button>
              </div>
            </div>
          </div>
          
          <button className="btn-retake" onClick={resetQuiz}>↺ Retake Quiz</button>
        </motion.div>
      );
    }
  };

  return (
    <section className="mix-lab-section" id="mix-lab">
      <div className="mix-lab-header">
        <h2 className="mix-lab-title">Mix Lab</h2>
        <p className="mix-lab-sub">Don't know what to pick? Let our algorithm do the heavy lifting.</p>
      </div>

      <div className="quiz-container">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MixLab;
