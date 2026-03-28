import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './WallOfLove.css';

const reviews = [
  {
    id: 1,
    name: 'Rahul',
    city: 'Bangalore',
    text: 'The Chilli Cha Cha is a mood! 🌶️ Perfect for sundowners when you don’t want to play bartender.',
    rating: 5
  },
  {
    id: 2,
    name: 'Ananya',
    city: 'Mumbai',
    text: 'Gulabi Ishq is literally the best thing that happened to my Friday nights. So aesthetic and tasty!',
    rating: 5
  },
  {
    id: 3,
    name: 'Vikram',
    city: 'Goa',
    text: 'Finally, cocktails that actually taste like they were made at a high-end bar. The packaging is 🔥.',
    rating: 5
  }
];

const WallOfLove = () => {
  return (
    <section className="wall-of-love">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="subtitle">Wall of Love</span>
          <h2 className="serif-title">What the Tribe is Saying</h2>
        </motion.div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <strong>{review.name}</strong>, <span>{review.city}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
