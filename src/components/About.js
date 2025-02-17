import React from "react";
import "../components/css/About.css"; // Add CSS styles
import Breadcrumbs from "./Breadcrumbs";
const About = () => {
  return (
    <div className="about-container">
             <Breadcrumbs />
      <h1>About Toshan Bakery</h1>
      <p className="intro">
        Welcome to <strong>Toshan Bakery</strong> - your go-to destination for freshly baked goods made with love!
      </p>

      <section className="story">
        <h2>Our Story</h2>
        <p>
          Toshan Bakery was founded with a passion for creating delicious, high-quality baked goods that bring people together. 
          From a small home kitchen to a full-fledged bakery, our journey has been fueled by love for baking and serving our 
          community with fresh, handmade delights.
        </p>
      </section>

      <section className="values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Quality First:</strong> We use only the finest ingredients.</li>
          <li><strong>Fresh & Handmade:</strong> Everything is baked fresh daily.</li>
          <li><strong>Customer Happiness:</strong> Your satisfaction is our priority.</li>
          <li><strong>Innovation:</strong> We bring new flavors and treats to delight our customers.</li>
        </ul>
      </section>

      <section className="why-choose">
        <h2>Why Choose Toshan Bakery?</h2>
        <p>
          At Toshan Bakery, we don't just bake – we create experiences. Whether you're celebrating a birthday, an anniversary, or just 
          treating yourself, our cakes, pastries, and breads will make every moment sweeter. 
        </p>
      </section>
    </div>
  );
};

export default About;
