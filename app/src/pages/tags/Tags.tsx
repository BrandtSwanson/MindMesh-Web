import React, { useEffect, useState } from "react";
import "../../styles/notes/NotesPage.css";
import "../../styles/global/App.css";
import { Link } from "react-router-dom";
import { deleteTag, getTags } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import { MDXEditor, markdownShortcutPlugin, codeBlockPlugin, headingsPlugin, quotePlugin, listsPlugin, ListsToggle, CodeToggle, Separator, linkPlugin, BlockTypeSelect, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import NewTagModal from "../notes/NewTagModal";

type Props = {
}

const Tags = ({}: Props) => {
  const [tags, setTags] = useState([]); // Array to store tags
  const [showNewTagModal, setShowNewTagModal] = useState(false); // State to control the visibility of the new tag modal

  // Fetch the list of notes when the component mounts
  useEffect(() => {
    getTags()
      .then((response) => setTags(response.data || []))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  // Function to delete a note by ID
  const deleteTagById = (id) => {
    deleteTag(id)
      .then(() => {
        setTags(tags.filter((tag) => tag.id !== id));
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="notes-page">
        <div className="notes-title">My Tags</div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
            onClick={() => setShowNewTagModal(true)}
            className="note-add-note-button"
            >
            Add new tag
            </button>
            <Link to={`/notes`}>
            <button className="note-add-note-button">
                Back
            </button>
            </Link>
        </div>
        {/* List of notes */}
        <ul className="note-list">
        {tags && tags.length > 0 && (
          tags.map((tag) => (
            <Link to={`/tags/${tag.id}` } className="notes-list-title">
            <li className="note-item" key={tag.id}>
              {tag.name}
                <button
                className="note-list-delete-button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the Link from being triggered
                  deleteTagById(tag.id);
                }}
                >
                Delete
                </button>
            </li>
            </Link>
          ))
        )}
        </ul>
      <NewTagModal
        isOpen={showNewTagModal}
        onClose={() => setShowNewTagModal(false)}
        curTags={tags}
        onTagAdded={(newTag: { id: number; name: string; createdAt: string }) => setTags([...tags, newTag])}
      />
      </div>
    </div>
  );
}

export default Tags;
