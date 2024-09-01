import React, { useEffect, useState } from "react";
import "../../styles/knowledge-base/KnowledgeBase.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { createNote, getNotes, deleteNote } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const KnowledgeBase = ({}: Props) => {
  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-page">
        <h1 className="notes-title">Areas of knowledge base</h1>

        {/* List of notes */}
        <ul>
            <li>
              <Link to={`/notes` } className="notes-entry-title">Notes</Link>
            </li>
            <li>
              <Link to={`/personal` } className="notes-entry-title">Personal data</Link>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default KnowledgeBase;
