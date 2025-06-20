import React, { useEffect, useState } from "react";
import "../../styles/knowledge-base/KnowledgeBase.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { createNote, getNotes, deleteNote } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

type Props = {
}

const KnowledgeBase = ({}: Props) => {
  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="knowledge-base-page">
        <h1 className="knowledge-base-title">Knowledge Base</h1>

        {/* List of notes */}
        <ul className="knowledge-base-list">
        <Link to={`/notes` } className="knowledge-base-entry-title">
            <li className="knowledge-base-item">
              Notes
            </li>
            </Link>
            <Link to={`/personal` } className="knowledge-base-entry-title">
            <li className="knowledge-base-item">
              Personal data
            </li>
            </Link>
            <Link to={`/external` } className="knowledge-base-entry-title">
            <li className="knowledge-base-item">
              External data
            </li></Link>
        </ul>
      </div>     
    </div>
  );
}

export default KnowledgeBase;
