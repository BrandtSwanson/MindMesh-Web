import React, { useEffect, useState } from "react";
import "../../styles/knowledge-base/KnowledgeBase.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { createNote, getNotes, deleteNote } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const ExternalKnowledge = ({}: Props) => {
  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-page">
        <h1 className="notes-title">External knowledge base</h1>

        {/* List of notes */}
        <ul className="knowledge-base-list">
            <li className="knowledge-base-item">
              <Link to={`/health` } className="notes-entry-title">Health</Link>
            </li>
            <li className="knowledge-base-item">
              <Link to={`/strava` } className="notes-entry-title">Strava</Link>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default ExternalKnowledge;
