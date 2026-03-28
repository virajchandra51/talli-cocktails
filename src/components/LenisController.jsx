import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useCart } from '../context/CartContext';

/**
 * LenisController
 * Pauses/resumes the Lenis smooth scroller whenever a modal or the cart is open.
 * Must be rendered inside both <ReactLenis> and <CartProvider>.
 */
const LenisController = () => {
  const lenis = useLenis();
  const { isCartOpen, razerPayActive, pendingProduct, activeLegalModal } = useCart();

  const isAnyOverlayOpen = isCartOpen || razerPayActive || !!pendingProduct || !!activeLegalModal;

  useEffect(() => {
    if (!lenis) return;
    if (isAnyOverlayOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isAnyOverlayOpen]);

  return null;
};

export default LenisController;
