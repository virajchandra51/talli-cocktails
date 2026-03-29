import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import './WallOfLove.css';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Rahul',
    text: 'The Chilli Cha Cha is a mood! 🌶️ Perfect for sundowners when you don’t want to play bartender.',
    rating: 5
  },
  {
    id: 2,
    name: 'Ananya',
    text: 'Gulabi Ishq is literally the best thing that happened to my Friday nights. So aesthetic and tasty!',
    rating: 5
  },
  {
    id: 3,
    name: 'Vikram',
    text: 'Finally, cocktails that actually taste like they were made at a high-end bar. The packaging is 🔥.',
    rating: 5
  }
];


const WallOfLove = () => {
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem('talliReviews');
    return stored ? JSON.parse(stored) : INITIAL_REVIEWS;
  });
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('talliReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    const newReview = {
      id: Date.now(),
      name: reviewName.trim(),
      text: reviewText.trim(),
      rating: reviewRating
    };
    setReviews(prev => [newReview, ...prev]);
    setReviewName('');
    setReviewText('');
    setReviewRating(5);
    setShowModal(false);
  };

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

        <button className="btn-add-review" onClick={() => setShowModal(true)}>
          Add Your Review
        </button>

        <AnimatePresence>
          {showModal && (
            <motion.div 
              className="review-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="review-modal"
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
              >
                <button className="btn-close-review" onClick={() => setShowModal(false)}>
                  <X size={32} />
                </button>
                <form className="review-form-modal" onSubmit={handleSubmitReview}>
                  <h2>Share Your Experience</h2>
                  <div className="star-input-row">
                    {[1,2,3,4,5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={star <= reviewRating ? 'star-btn active' : 'star-btn'}
                        onClick={() => setReviewRating(star)}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star size={28} fill={star <= reviewRating ? '#FFD700' : 'none'} color="#FFD700" />
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Your name"
                    maxLength={32}
                  />
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your review"
                    maxLength={300}
                  />
                  <button type="submit" className="btn-submit-review">Submit Review</button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <strong>{review.name}</strong>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
