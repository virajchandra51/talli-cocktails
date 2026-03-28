import React from 'react';
import WaterModal from './WaterModal';
import { useCart } from '../context/CartContext';
import waterImg from '../assets/water.jpeg';

/**
 * WaterModalWrapper
 * Bridges the CartContext pendingProduct state with the existing WaterModal component.
 * When a product is added to cart, this modal pops up asking if user wants water.
 */
const WaterModalWrapper = () => {
  const { pendingProduct, setPendingProduct, addItem, setIsCartOpen } = useCart();

  const handleClose = () => {
    // User dismissed modal — still add the original product
    if (pendingProduct) {
      addItem(pendingProduct, false);
      setPendingProduct(null);
      setIsCartOpen(true);
    }
  };

  const handleConfirm = (addWater) => {
    if (pendingProduct) {
      // Add the cocktail
      addItem(pendingProduct, false);

      // Optionally add water
      if (addWater) {
        addItem({
          id: 'water',
          name: 'Talli Water',
          price: 25,
          img: waterImg,
          image: waterImg,
          quantity: 1
        }, false);
      }

      setPendingProduct(null);
      setIsCartOpen(true);
    }
  };

  return (
    <WaterModal
      isOpen={!!pendingProduct}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );
};

export default WaterModalWrapper;
