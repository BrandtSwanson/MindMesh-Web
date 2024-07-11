import React, { useEffect, useState } from "react";
import "../../styles/notes/NotesPage.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { createNote, getNotes, deleteNote } from "../../api/api";
import TitleBar from "../../components/TitleBar";

type Props = {
}

const Notes = ({}: Props) => {
  const [notes, setNotes] = useState([]); // Array to store notes
  const [newNoteText, setNewNoteText] = useState(""); // Input field for creating a new note
  const [newNoteTitle, setNewNoteTitle] = useState(""); // Input field for creating a new note

  // Fetch the list of notes when the component mounts
  useEffect(() => {
    getNotes()
      .then((response) => setNotes(response.data || []))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Function to add a new note
  const addNote = () => {
    if (newNoteText.trim() !== "") {
      if(newNoteTitle.trim() !== "") {
      // Create a new note object with a unique ID
      const newNote = {
        id: Date.now(),
        title: newNoteTitle,
        content: newNoteText,
        // Add more properties as needed (e.g., createdAt, updatedAt)
      };

      createNote(JSON.stringify(newNote))
        .then((response) => {
          // Update the state to include the new note
          setNotes([...notes, newNote]);
          setNewNoteText(""); // Clear the input field
          setNewNoteTitle("");
        })
        .catch((error) => console.error("Error creating note:", error));
    } else {
        // Create a new note object with a unique ID
      const newNote = {
        id: Date.now(),
        title: "Quick jot: " + newNoteText.substring(0,10),
        content: newNoteText,
        // Add more properties as needed (e.g., createdAt, updatedAt)
      };

      createNote(JSON.stringify(newNote))
        .then((response) => {
          // Update the state to include the new note
          setNotes([...notes, newNote]);
          setNewNoteText(""); // Clear the input field
          setNewNoteTitle("");
        })
        .catch((error) => console.error("Error creating note:", error));
    }
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addNote();
    }
  };

  // Function to delete a note by ID
  const deleteNoteById = (id) => {
    deleteNote(id)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-page">
        <h1 className="notes-title">My Notes</h1>
        <input className="notes-quick-entry"
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new note title..."
        />
        <input className="notes-quick-entry"
          type="text"
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new note..."
        />
        <button onClick={addNote}>Add Note</button>

        {/* List of notes */}
        <ul>
        {notes && notes.length > 0 && (
          notes.map((note) => (
            <li key={note.id}>
              <Link to={`/notes/${note.id}` } className="notes-entry-title">{note.title}</Link>
              <button onClick={() => deleteNoteById(note.id) }>Delete</button>
            </li>
          ))
        )}
        </ul>
      </div>
    </div>
  );
}

export default Notes;
