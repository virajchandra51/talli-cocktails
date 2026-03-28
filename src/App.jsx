import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import AgeGate from './components/AgeGate';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlavourCarousel from './components/FlavourCarousel';
import ProductPage from './components/ProductPage';
import MixLab from './components/MixLab';
import WallOfLove from './components/WallOfLove';
import HouseParty from './components/HouseParty';
import ReturnEarn from './components/ReturnEarn';
import StoreLocator from './components/StoreLocator';
import TalliStories from './components/TalliStories';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SuccessOverlay from './components/SuccessOverlay';
import LegalOverlay from './components/LegalOverlay';
import RazerPayModal from './components/RazerPayModal';
import WaterModalWrapper from './components/WaterModalWrapper';
import LenisController from './components/LenisController';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <CartProvider>
      <SuccessOverlay />
      <LegalOverlay />
      <RazerPayModal />
      <WaterModalWrapper />
      <Router>
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
          <LenisController />
          <div className="app-container">
            <AgeGate isVerified={isVerified} onVerified={() => setIsVerified(true)} />
          {isVerified && (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={
                  <main className="main-content">
                    <Hero />
                    <FlavourCarousel />
                    <MixLab />
                    <div id="wall-of-love"><WallOfLove /></div>
                    <HouseParty />
                    <ReturnEarn />
                    <StoreLocator />
                    <TalliStories />
                    <FinalCTA />
                    <Footer />
                  </main>
                } />
                <Route path="/product/:id" element={<ProductPage />} />
              </Routes>
              <CartDrawer />
            </>
          )}
        </div>
      </ReactLenis>
    </Router>
    </CartProvider>
  );
}

export default App;
