import React from "react";
import "../../styles/home/HomePage.css";
import { Link } from "react-router-dom";


type Props = {
}

const HomePage = ({}: Props) => {
  return (
    <div className="home-page">
      <div className="title-bar">
        <h1 className="title-bar-text">MINDMESH</h1>
      </div>

      <div className="features">
        <div className="notes">
        <Link to={`/knowledgebase/`} style={{ textDecoration: 'none' }}>
          <h2 className="feature-text">KNOWLEDGE</h2>
        </Link>
        </div>
        <div className="planner">
          <Link to={`/goals/`} style={{ textDecoration: 'none' }}>
          </Link>
          <div className="planner-cal"></div>
          <div className="planner-todo"></div>
          <div className="planner-reminder"></div>
          <h2 className="planner-text">AGENTS</h2>
        </div>
        <div className="assistant">
          <Link to={`/assistant/`} style={{ textDecoration: 'none' }}>
              <h2 className="feature-text">VIEWS</h2>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
