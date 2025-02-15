import "../styles/components/TitleBar.css";
import { Link } from "react-router-dom";
import React, { MouseEventHandler } from 'react'

type Props = {
  text: string,
}

const TitleBar = ({text}: Props) => (
    <div className="title-bar">
      <div className="title-bar-notes">
        <Link to={`/`} style={{ textDecoration: 'none' }}><div className="filler"></div></Link>
      </div>
      
      <div className="title-bar-planner">
        <div className="title-bar-planner-cal"><Link to={`/knowledgebase`}><div className="filler"></div></Link></div>
        <div className="title-bar-planner-todo"><Link to={`/agents`}><div className="filler"></div></Link></div>
        <div className="title-bar-planner-reminder"><Link to={`/calendar`}><div className="filler"></div></Link></div>
      </div>

      <div className="title-bar-agent">
      <Link to={`/`} style={{ textDecoration: 'none' }}><div className="filler"></div></Link>
      </div>
      
    </div>
)

export default TitleBar;
