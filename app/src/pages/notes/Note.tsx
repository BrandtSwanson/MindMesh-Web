import React, { useEffect, useState } from "react";
import "../../styles/notes/NotesPage.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { createNote, getNotes, deleteNote, getTags, addTaggedRelation } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import { MDXEditor, markdownShortcutPlugin, codeBlockPlugin, headingsPlugin, quotePlugin, listsPlugin, ListsToggle, CodeToggle, Separator, linkPlugin, BlockTypeSelect, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import NewTagModal from "./NewTagModal";

type Props = {
}

const Notes = ({}: Props) => {
  const [notes, setNotes] = useState([]); // Array to store notes
  const [newNoteText, setNewNoteText] = useState(""); // Input field for creating a new note
  const [newNoteTitle, setNewNoteTitle] = useState(""); // Input field for creating a new note
  const [tags, setTags] = useState([]); // Array to store tags
  const [selectedTags, setSelectedTags] = useState([]); // Array to store selected tags
  const [showNewTagModal, setShowNewTagModal] = useState(false); // State to control the visibility of the new tag modal

  // Fetch the list of notes when the component mounts
  useEffect(() => {
    getNotes()
      .then((response) => setNotes(response.data || []))
      .catch((error) => console.error("Error fetching notes:", error));
    getTags()
      .then((response) => setTags(response.data || []))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  // Function to add a new note
  const addNote = () => {
    const newNoteId = Date.now();
    if (newNoteText.trim() !== "") {
      if(newNoteTitle.trim() !== "") {
        // Create a new note object with a unique ID
        console.log(selectedTags);
        const newNote = {
          id: newNoteId,
          title: newNoteTitle,
          content: newNoteText,
          createdAt: new Date(Date.now()).toISOString(),
          updatedAt: new Date(Date.now()).toISOString(),
          tags: selectedTags, // Include selected tags
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
          id: newNoteId,
          title: "Quick jot: " + newNoteText.substring(0,10),
          content: newNoteText,
          createdAt: new Date(Date.now()).toISOString(),
          updatedAt: new Date(Date.now()).toISOString(),
          tags: selectedTags, // Include selected tags
          // Add more properties as needed (e.g., createdAt, updatedAt)
        };

        console.log(newNote.createdAt);

        createNote(JSON.stringify(newNote))
          .then((response) => {
            // Update the state to include the new note
            setNotes([...notes, newNote]);
            setNewNoteText(""); // Clear the input field
            setNewNoteTitle("");
          })
          .catch((error) => console.error("Error creating note:", error));
      }
      for (const tag of tags) {
        console.log(tag);
        addToTag(tag.id, newNoteId);
      }
    }
  };

  /*
  type TaggedRelation struct {
	EntityType string `json:"entityType"` // e.g., "note", "event", "workout"
	EntityID   int    `json:"entityId"`
}
  */
  const addToTag = (tagId, newNoteId) => {
    const newTaggedRelation = {
      entityType: "note",
      entityId: newNoteId,
    };
    addTaggedRelation(tagId, JSON.stringify(newTaggedRelation))
      .then((response) => {
        console.log("Tagged relation added successfully:", response.data);
      })
      .catch((error) => console.error("Error adding tagged relation:", error));
  }

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
        <div className="notes-title">My Notes</div>
        <Link to={`/tags` } className="notes-list-title">
        <button className="note-add-note-button">
            View Tags
        </button>
        </Link>
        <div className="notes-quick-entry">
        <MDXEditor
            markdown={newNoteText}
            onChange={(e) => setNewNoteText(e)}
            plugins={[
              toolbarPlugin({
                // toolbarClassName: 'my-classname',
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <Separator />
                    <BoldItalicUnderlineToggles />
                    <Separator />
                    <CodeToggle />
                    <BlockTypeSelect />
                    <ListsToggle />
                  </>
                )
              }),
              linkPlugin(),
              listsPlugin(),
              headingsPlugin(),
              quotePlugin(),
              codeBlockPlugin(),
              markdownShortcutPlugin()
            ]}
          />
        </div>
        <button className="note-add-note-button" onClick={addNote}>Add Note</button>
        <div className="tags-dropdown">
          {/* <label htmlFor="tags-select">Tags:</label> */}
            <div id="tags-select" className="tags-checkbox-dropdown">
            {tags.map((tag) => (
              <label key={tag.name}>
                <input
                  type="checkbox"
                  value={tag.name}
                  checked={selectedTags.includes(tag.name)}
                  onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTags([...selectedTags, tag.name]);
                  } else {
                    setSelectedTags(selectedTags.filter((t) => t !== tag.name));
                  }
                  }}
                />{" "}
                {tag.name}
              </label>
            ))}
            </div>
            <button onClick={() => setShowNewTagModal(true)} className="note-add-note-button">
              Add new tag
            </button>
        </div>
        {/* List of notes */}
        <ul className="note-list">
        {notes && notes.length > 0 && (
          notes.map((note) => (
            <Link to={`/notes/${note.id}` } className="notes-list-title">
            <li className="note-item" key={note.id}>
              {note.title}
                <button
                className="note-list-delete-button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the Link from being triggered
                  deleteNoteById(note.id);
                }}
                >
                Delete
                </button>
            </li></Link>
          ))
        )}
        </ul>
      <NewTagModal
        isOpen={showNewTagModal}
        onClose={() => setShowNewTagModal(false)}
        curTags={tags}
      />
      </div>
    </div>
  );
}

export default Notes;
