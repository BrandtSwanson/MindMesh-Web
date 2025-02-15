import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNote, getNotes, updateNote } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import "../../styles/notes/NoteDetail.css"

type Props = {
}

const NoteDetail = ({}: Props) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false); // Add state for editing
  const [editedContent, setEditedContent] = useState(""); // Add state for edited content
  const { noteId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of notes when the component mounts
    getNotes()
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  useEffect(() => {
    // Find the note based on the ID in the URL params
    const selectedNote = notes.find((n) => n.id === parseInt(noteId));
    setNote(selectedNote);
  }, [noteId, notes]);

  const handleEdit = () => {
    setEditing(true);
    setEditedContent(note.content);
  };

  const handleSave = () => {
    // Save the edited content
    // You can implement the save functionality here using an API call or any other method
    // For simplicity, let's just update the note object in the state
    const updatedNote = { ...note, content: editedContent };
    setNote(updatedNote);
    updateNote(parseInt(noteId), updatedNote);
    setEditing(false);
  };

  const handleDelete = () => {
    // Save the edited content
    // You can implement the save functionality here using an API call or any other method
    // For simplicity, let's just update the note object in the state
    deleteNote(parseInt(noteId));
    navigate("/notes");
  };

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-detail-page">
        <div className="notes-detail-view">
        {note ? (
          <div>
            <div className="notes-detail-title">{note.title}</div>
            {editing ? (
              <input
                className="notes-detail-quick-entry"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <p className="notes-detail-description">{note.content}</p>
            )}
            {editing ? (
              <button  className="notes-detail-button"onClick={handleSave}>Save</button>
            ) : (
              <button  className="notes-detail-button"onClick={handleEdit}>Edit</button>
            )}
          </div>
        ) : (
          <p>Note not found</p>
        )}
        <button className="notes-detail-button" onClick={handleDelete}>Delete</button>
        <Link to="/notes">
          <button className="notes-detail-button">Back to Notes</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default NoteDetail;
