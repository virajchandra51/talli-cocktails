import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import './StoreLocator.css';

const StoreLocator = () => {
  const [selectedCity, setSelectedCity] = useState('Gurgaon');
  const [searchResult, setSearchResult] = useState(null);
  const cities = ['Gurgaon'];

  const handleSearch = () => {
    setSearchResult(`Available in ${selectedCity} at 1 premium store. 15-min delivery active.`);
  };

  const handleLocate = (e) => {
    e.preventDefault();
    if (selectedCity) {
      handleSearch();
    }
  };

  return (
    <section className="store-locator" id="find-talli">
      <div className="locator-container">
        <div className="locator-text">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Find Talli Near You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            The bar is closer than you think. Enter your location to find the nearest Talli vendor.
          </motion.p>
          
          <motion.form 
            className="search-box"
            onSubmit={handleLocate}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="input-wrapper">
              <MapPin className="search-icon" size={20} />
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="city-select"
              >
                <option value="" disabled>Select your city...</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-locate">Check Coverage</button>
          </motion.form>
          
          <AnimatePresence>
            {searchResult && (
              <motion.div 
                className="availability-status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div className="status-dot" />
                <p>{searchResult}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          className="mock-map"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="map-placeholder">
            <div className="map-grid" />
            <motion.div 
              className="map-pin"
              initial={{ y: -50, opacity: 0 }}
              animate={searchResult ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <div className="pin-bottle" />
              <div className="pin-shadow" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StoreLocator;
