import "../styles/components/TitleBar.css";
import { Link } from "react-router-dom";
import React, { MouseEventHandler } from 'react'

type Props = {
  text: string,
}

const TitleBar = ({text}: Props) => (
    <div className="title-bar">
      <div className="title-bar-notes">
      <Link to={`/notes/`} style={{ textDecoration: 'none' }}><div className="filler"></div></Link>
      </div>
      
      <div className="title-bar-planner">
        <div className="title-bar-planner-cal">
        <Link to={`/`}><div className="filler"></div></Link></div>
        <div className="title-bar-planner-todo"></div>
        <div className="title-bar-planner-reminder"></div>
      </div>
      <div className="title-bar-assistant">
      <Link to={`/assistant/`} style={{ textDecoration: 'none' }}><div className="filler"></div></Link>
      </div>
      
    </div>
)

export default TitleBar;
