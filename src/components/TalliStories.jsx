import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TalliStories.css';

const stories = [
  { id: 1, title: 'The Art of the Sundowner', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', description: 'Mastering the transition from day to night with the perfect blend.' },
  { id: 2, title: 'Why Glass Matters', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800', description: 'The science behind the vessel and how it preserves our craft flavors.' },
  { id: 3, title: 'Mixology 101', image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800', description: 'Professional tips for serving Talli like a certified bartender.' }
];

const TalliStories = () => {
  const [showToast, setShowToast] = useState(false);

  const handleReadMore = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section className="talli-stories" id="talli-stories">
      <div className="stories-container">
        <motion.h2 
          className="stories-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Talli Stories
        </motion.h2>
        
        <div className="stories-grid">
          {stories.map((story) => (
            <motion.div 
              key={story.id} 
              className="story-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: story.id * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="story-image" style={{ backgroundImage: `url(${story.image})` }}>
                <div className="story-overlay" />
              </div>
              <div className="story-info">
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <button className="btn-read-more" onClick={handleReadMore}>Read More</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            className="coming-soon-toast"
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
          >
            Story coming soon to the Tribe! 📖✨
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TalliStories;
