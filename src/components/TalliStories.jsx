import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TalliStories.css";

const stories = [
    {
        id: 1,
        title: "The Art of the Sundowner",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
        description:
            "Mastering the transition from day to night with the perfect blend.",
        longText: `As the sun dips below the horizon and the city’s golden hour begins, the Talli team springs into action. Our sundowner ritual is more than just a delivery—it’s a carefully orchestrated experience. Each evening, we source the freshest tropical fruits and botanicals, prepping them in small batches to ensure every bottle is as vibrant as the sunset itself. Our mixologists handcraft each blend, balancing flavors to perfection, and then chill the bottles with our signature rock-hard ice, designed to keep your cocktails cold for hours without dilution.

But the magic doesn’t stop at the recipe. Our logistics crew coordinates with local partners to map the fastest routes, ensuring your order leaves our kitchen at peak freshness. Every bottle is packed in eco-friendly, insulated carriers that lock in the chill and protect the glass, so your drinks arrive as crisp as when they left us. Within 1-2 hours, your doorbell rings and the sundowner is in your hands—no stress, no prep, just pure relaxation. This is the Talli promise: to turn every evening into a celebration, one perfectly timed delivery at a time. Whether you’re hosting friends or unwinding solo, our sundowner story is proof that great nights start with great service.`,
    },
    {
        id: 2,
        title: "Why Glass Matters",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800",
        description:
            "The science behind the vessel and how it preserves our craft flavors.",
        longText: `At Talli, we believe the vessel is as important as the cocktail itself. That’s why every drink is bottled in premium, food-grade glass—never plastic or metal. Glass preserves the integrity of our craft flavors, keeping out unwanted odors and ensuring that every note, from citrus to spice, shines through. Our bottles are designed with a thick base and a tight seal, locking in carbonation and freshness for the journey from our bar to your home.

But there’s more to it than taste. Glass is endlessly recyclable, making it the most sustainable choice for conscious consumers. Each returned bottle is sanitized and reused, reducing waste and supporting our mission to keep the planet as clean as our cocktails. The clarity of glass also lets you appreciate the color and texture of each blend, turning every pour into a visual treat. When you choose Talli, you’re not just getting a drink—you’re joining a movement for better, greener, and more beautiful cocktail experiences. Raise a glass, and taste the difference that quality makes.`,
    },
    {
        id: 3,
        title: "Mixology 101",
        image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800",
        description:
            "Professional tips for serving Talli like a certified bartender.",
        longText: `Want to serve Talli like a pro? Start with the basics: always chill your glassware before pouring, and use large, clear ice cubes to keep dilution minimal. For a spicy twist, rim your glass with a blend of salt and chili powder—our Chilli Cha Cha pairs perfectly with a little heat. Garnish with fresh herbs or citrus peels to elevate the aroma and add a pop of color.

Presentation matters, so pour slowly and let the bubbles settle before serving. Treat each glass as a tasting flight, encouraging your guests to savor the unique notes in every blend. And don’t forget the story—share the journey of your Talli bottle, from our kitchen to your table, to make every sip a conversation starter. With these tips, you’ll turn any gathering into a masterclass in modern mixology, and every guest into a lifelong fan of the Talli experience.`,
    },
];


const TalliStories = () => {
    const [activeStory, setActiveStory] = useState(null);
    const closeStory = () => setActiveStory(null);

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
                                <button className="btn-read-more" onClick={() => setActiveStory(story)}>
                                    Read More
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {activeStory && (
                    <motion.div
                        className="story-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeStory}
                    >
                        <motion.div
                            className="story-modal"
                            initial={{ scale: 0.95, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="btn-close-story" onClick={closeStory}>
                                ×
                            </button>
                            <div className="story-modal-content">
                                <img
                                    src={activeStory.image}
                                    alt={activeStory.title}
                                    className="story-modal-image"
                                />
                                <h2>{activeStory.title}</h2>
                                <p className="story-modal-text">{activeStory.longText}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default TalliStories;
