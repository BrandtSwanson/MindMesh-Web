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
          <h2 className="notes-text">KNOWLEDGE</h2>
        </Link>
        </div>
        <Link to={`/agents/`} className="planner">
          {/* <Link to={`/goals/`} className="planner-cal" style={{ textDecoration: 'none' }}> */}
          <div className="planner-cal"></div>
          {/* </Link> */}
          <div className="planner-todo"></div>
          <div className="planner-reminder"></div>
          <h2 className="planner-text">AGENTS</h2>
        </Link>
        <div className="agent">
          <Link to={`/calendar/`} style={{ textDecoration: 'none' }}>
              <h2 className="views-text">VIEWS</h2>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
