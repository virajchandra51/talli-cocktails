import { motion } from 'framer-motion';
import bgVideo from '../assets/bg-video.mp4';
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import './Hero.css';

const Hero = () => {
  const headline = 'The bar just got bottled.';
  const subheadline = 'Good drinks don’t need a bartender.';

  const marqueeImages = [img1, img2, img3, img4, img5, img6];

  // Framer Motion variants for stagger
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        // delayChildren: 0.3
      } 
    }
  };

  const wordVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero-section">
      <div className="hero-video-wrapper">
        <video 
          className="hero-bg-video" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="hero-blur-overlay"></div>
      </div>

      {/* Left Marquee */}
      <div className="hero-marquee-sidebar left-sidebar">
        <div className="marquee-track track-down">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <img key={`left-${i}`} src={img} alt="Talli Cocktail" className="marquee-img" />
          ))}
        </div>
      </div>

      {/* Right Marquee */}
      <div className="hero-marquee-sidebar right-sidebar">
        <div className="marquee-track track-up">
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <img key={`right-${i}`} src={img} alt="Talli Cocktail" className="marquee-img" />
          ))}
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text-col">
          <motion.h1 
            className="hero-headline"
            variants={containerVars}
            initial="hidden"
            animate="visible"
          >
            {headline.split(' ').map((word, index) => (
              <span key={index} style={{ display: 'inline-block', overflow: 'hidden' }}>
                <motion.span variants={wordVars} className="word">
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.h2 
            className="hero-subhead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {subheadline}
          </motion.h2>

          <motion.p
            className="hero-supporting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            Ready-to-pour cocktails designed for effortless consumption and social occasions.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <a href="#flavours" className="btn-primary-hero">Get Talli</a>
            <a href="#flavours" className="btn-secondary-hero">Explore Flavours</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
