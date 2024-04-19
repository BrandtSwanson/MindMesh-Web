import React from "react";
import "../../styles/home/HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to Your Productivity App</h1>
        <p>Stay organized, set goals, and achieve more every day.</p>
      </header>

      <section className="features">
        <div className="feature">
          <h2><Link to={`/notes/`}>Notes</Link></h2>
          <p>Keep track of your to-do lists and tasks efficiently.</p>
        </div>
        <div className="feature">
          <i className="fas fa-chart-line"></i>
          <h2><Link to={`/goals/`}>Goals</Link></h2>
          <p>Set and track your goals for personal and professional growth.</p>
        </div>
        <div className="feature">
          <h2>Progress Tracking</h2>
          <p>Visualize your progress and analyze your productivity.</p>
        </div>
      </section>

      <footer className="footer">
        <p>Get started and boost your productivity today!</p>
        <button className="get-started-button">Get Started</button>
      </footer>
    </div>
  );
}

export default HomePage;
