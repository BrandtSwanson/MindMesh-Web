import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getNotes } from "../../api/api";


type Props = {
}

const NoteDetail = ({}: Props) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const { noteId } = useParams();

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

  return (
    <div>
      {note ? (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ) : (
        <p>Note not found</p>
      )}
      <Link to="/notes">Back to Notes</Link>
    </div>
  );
}

export default NoteDetail;
