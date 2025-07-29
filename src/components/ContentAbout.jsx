import React from "react";
import "../styles/ContentAbout.css";

const ContentAbout = () => {
  return (
    <div className="about-section">
      <h1 className="about-title">Who We Are</h1>
      <p className="about-text">
        Were not just another map tool — we’re a smarter way to explore India in 3D.
        Whether you're a curious learner, a traveler, or just someone who loves exploring places from your screen,
        we’ve got you covered.
      </p>
      <p className="about-text">
        Built using <strong>React</strong> and powered by <strong>CesiumJS</strong>, this platform blends high-end
        tech with clean design to give you stunning real-time views of Indian states — with crowd-avoidance in mind.
      </p>
      <p className="about-text">
        Our mission? Make your journey smarter, smoother, and more informed.
        Stay ahead, avoid the rush, and explore better. 🔍🌍
      </p>
      <div className="about-footer">
        🚀 Built with passion. Designed for explorers.
      </div>


      
<section className="tech-used">
  <h2>🛠 Technologies We Used</h2>
  <div className="tech-grid">
    <div className="tech-item">React.js</div>
    <div className="tech-item">Vite</div>
    <div className="tech-item">CesiumJS</div>
    <div className="tech-item">JavaScript (ES6+)</div>
    <div className="tech-item">HTML5</div>
    <div className="tech-item">CSS3</div>
    <div className="tech-item">React Router</div>
    <div className="tech-item">Git & GitHub</div>
  </div>
</section>


    </div>
  );
};

export default ContentAbout;
