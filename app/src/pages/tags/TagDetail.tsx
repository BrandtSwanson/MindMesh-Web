import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNotes, getTags,  } from "../../api/api";
import TitleBar from "../../components/TitleBar";
import "../../styles/notes/NoteDetail.css"

type Props = {
}

const TagDetail = ({}: Props) => {
    const [notes, setNotes] = useState([]);
    const [relatedItems, setRelatedItems] = useState([]);
    const [tag, setTag] = useState(null);
    const [tags, setTags] = useState([]);

    const { tagId } = useParams();

  useEffect(() => {
    // Fetch the list of notes when the component mounts
    getNotes()
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
    getTags()
      .then((response) => setTags(response.data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  useEffect(() => {
    // Find the tag based on the ID in the URL params
    const selectedTag = tags.find((t) => t.id === parseInt(tagId || "", 10));
    setTag(selectedTag || null);

    // Find related notes based on the tag ID
    const relatedNotes = notes.filter((n) => Array.isArray(n.tags) && n.tags.includes(parseInt(tagId || "", 10)));
    setRelatedItems(relatedNotes);
  }, [tagId, notes, tags]);

    return (
        <div className="app">
            <TitleBar text=""></TitleBar>
            <div className="notes-page">
                <div className="notes-title">{tag?.name || "Untitled Tag"}</div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <ul className="note-list">
                        {relatedItems?.length > 0 ? (
                            relatedItems.map((item) => (
                                <li className="note-item" key={item.id}>
                                    {item.title}
                                </li>
                            ))
                        ) : (
                            <li>No related items found</li>
                        )}
                    </ul>
                </div>
                {/* List of notes */}
                <ul className="note-list">
                    {relatedItems?.length > 0 ? (
                        relatedItems.map((relatedItem) => (
                            <li className="note-item" key={relatedItem.id}>
                                {relatedItem.name}
                            </li>
                        ))
                    ) : (
                        <li>No related notes found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TagDetail;
