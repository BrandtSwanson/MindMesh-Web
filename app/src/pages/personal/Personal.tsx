import { useEffect, useState } from "react";
import "../../styles/notes/NotesPage.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { addPersonalData, getPersonalEntries } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const Personal = ({}: Props) => {
  const [joyousness, setJoyousness] = useState(0);
  const [water, setWater] = useState(0);
  const [relaxation, setRelaxation] = useState(0);
  const [alertness, setAlertness] = useState(0);
  const [screenTime, setScreenTime] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [outsideTime, setOutsideTime] = useState(0);
  const [personalEntries, setPersonalEntries] = useState([]); // Array to store notes

  // Fetch the list of notes when the component mounts
//   useEffect(() => {
//     getNotes()
//       .then((response) => setNotes(response.data || []))
//       .catch((error) => console.error("Error fetching notes:", error));
//   }, []);

  // Function to add a new note
  const addPersonal = () => {
        // Create a new note object with a unique ID
        const newPersonal = {
        id: Date.now(),
        water: water,
        joyousness: joyousness,
        relaxation: relaxation,
        alertness: alertness,
        screenTime: screenTime,
        satisfaction: satisfaction,
        outsideTime: outsideTime,
        // Add more properties as needed (e.g., createdAt, updatedAt)
        };

        addPersonalData(JSON.stringify(newPersonal))
        .then((response) => {
            // Update the state to include the new note
            setJoyousness(0);
            setWater(0);
            setRelaxation(0);
            setAlertness(0);
            setScreenTime(0);
            setSatisfaction(0);
            setOutsideTime(0);
        })
        .catch((error) => console.error("Error creating PersonalData:", error));
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addPersonal();
    }
  };
  useEffect(() => {
    getPersonalEntries()
      .then((response) => setPersonalEntries(response.data || []))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-page">
      <h1 className="notes-title">Personal Data</h1>
        <input className="notes-quick-entry"
          type="text"
          value={joyousness || ""}
          onChange={(e) => setJoyousness(parseInt(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Enter joyousness levels..."
        />
        <input className="notes-quick-entry"
          type="text"
          value={relaxation || ""}
          onChange={(e) => setRelaxation(parseInt(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Enter relaxation levels..."
        />
        <input className="notes-quick-entry"
          type="text"
          value={alertness || ""}
          onChange={(e) => setAlertness(parseInt(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Enter your alertness..."
        />
        <input className="notes-quick-entry"
          type="text"
          value={screenTime || ""}
          onChange={(e) => setScreenTime(parseInt(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Enter screen time in hours..."
        />
        <input className="notes-quick-entry"
          type="text"
          value={satisfaction || ""}
          onChange={(e) => setSatisfaction(parseInt(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Enter your satisfaction..."
        />
        <input className="notes-quick-entry"
          type="text"
          value={outsideTime || ""}
          onChange={(e) => setOutsideTime(parseInt(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Enter outside time in hours..."
        />
        <input className="notes-quick-entry"
          type="text"
          value={water || ""}
          onChange={(e) => setWater(parseInt(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Enter water drank..."
        />
        <button className="note-add-note-button" onClick={addPersonal}>Add Data</button>

        {/* List of notes */}
        <ul className="note-list">
        {personalEntries && personalEntries.length > 0 && (
          personalEntries.map((entry) => (
            <li className="note-item" key={entry.id}>
              <h5 style={{ color: '#fff' }}>{entry.timestamp}</h5>
            </li>
          ))
        )}
        </ul>
      </div>
    </div>
  );
}

export default Personal;
