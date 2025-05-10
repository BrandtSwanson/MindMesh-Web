import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNote, getNotes, updateNote } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import NoteMetadataModal from "./NoteMetadataModal";
import "../../styles/notes/NoteDetail.css"
import ReactMarkdown from 'react-markdown';
import { MDXEditor, markdownShortcutPlugin, codeBlockPlugin, headingsPlugin, quotePlugin, listsPlugin, ListsToggle, CodeToggle, Separator, linkPlugin, BlockTypeSelect, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import rehypeRaw from 'rehype-raw';

type Props = {
}

const NoteDetail = ({}: Props) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false); // Add state for editing
  const [editedContent, setEditedContent] = useState(""); // Add state for edited content
  const [showMeta, setShowMeta] = useState(false);
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

  const handleCancel = () => {
    setEditing(false);
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
            <div className="notes-detail-more-info-button" onClick={() => setShowMeta(true)}>
                i
            </div>
            {editing ? (
              <div className="notes-detail-quick-entry">
                <MDXEditor
                  markdown={editedContent}
                  onChange={(e) => setEditedContent(e)}
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
            ) : (
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]} 
                components={{
                  u: ({ node, ...props }) => (
                    <span style={{ textDecoration: 'underline' }} {...props} />
                  ),
                }}
                className="notes-detail-description"
              >
                {note.content}
              </ReactMarkdown>
            )}
          </div>
        ) : (
          <p>Note not found</p>
        )}
        {editing ? (
          editedContent === note.content ? (
            <button className="notes-detail-button" onClick={handleCancel}>Cancel</button>
          ) : (
            <button className="notes-detail-button" onClick={handleSave}>Save</button>
          )
        ) : (
          <button  className="notes-detail-button"onClick={handleEdit}>Edit</button>
        )}
        <button className="notes-detail-button" onClick={handleDelete}>Delete</button>
        <Link to="/notes">
          <button className="notes-detail-button">Back to Notes</button>
        </Link>
      </div>
      {note && (
        <NoteMetadataModal
          isOpen={showMeta}
          onClose={() => setShowMeta(false)}
          metadata={{
            title: note.title,
            createdAt: new Date(note.createdat).toLocaleString(),
            updatedAt: new Date(note.updatedat).toLocaleString(),
            id: note.id,
            tags: note.tags,
          }}
        />
      )}
      </div>
        
    </div>
  );
}

export default NoteDetail;
