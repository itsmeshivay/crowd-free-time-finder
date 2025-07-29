// src/components/StateGrid.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/State.css";
import { statesData } from "../statesData";

const StateGrid = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="state-section">
      <h2 className="section-title text-2xl md:text-3xl font-extrabold typewriter">Explore Indian States</h2>
      <div className="state-grid">
        {statesData.map((state, index) => (
          <div
            className="state-card"
            key={index}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <img src={state.image} alt={state.name} className="state-img" />
            <div className="card-content">
            
              <h3>{state.name}</h3>
              <p>{state.description}</p>
              <a
                href={state.wiki}
                target="_blank"
                rel="noopener noreferrer"
                className="card-btn"
              >
                Learn More
              </a>
            </div>
          </div>

              



        ))}
      </div>
    </section>
  );
};

export default StateGrid;
