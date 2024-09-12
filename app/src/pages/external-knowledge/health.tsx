import React, { useEffect, useState } from "react";
import "../../styles/notes/NotesPage.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { addPersonalData, getPersonalEntries } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const Health = ({}: Props) => {
  const [personalEntries, setPersonalEntries] = useState([]); // Array to store notes 

  useEffect(() => {
    getPersonalEntries()
      .then((response) => setPersonalEntries(response.data || []))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-page">
      <h1 className="notes-title">Health Data</h1>
        {/* List of notes */}
        <ul>
        {personalEntries && personalEntries.length > 0 && (
          personalEntries.map((entry) => (
            <li key={entry.id}>
              <h5 style={{ color: '#fff' }}>{entry.timestamp}</h5>
            </li>
          ))
        )}
        </ul>
      </div>
    </div>
  );
}

export default Health;
