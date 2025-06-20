import "../../styles/notes/NoteMetadataModal.css"; // Create a CSS file for styling
import { addTag } from "../../api/api";
import { on } from "events";
import React, { useState } from "react";

const NewTagModal = ({ isOpen, onClose, curTags, onTagAdded }: { isOpen: boolean; onClose: () => void; curTags: any[]; onTagAdded?: (tag: { id: number; name: string }) => void }) => {
    const [tag, setTag] = useState({
        id: 0,
        name: "",
    });

    if (!isOpen) {
        return null;
    }

    // Function to add a new note
    const addNewTag = () => {
      const inputElement = document.getElementById("tagName") as HTMLInputElement;
      const newTag = inputElement?.value.trim();
      
      if (newTag != "") {
        if (Array.isArray(curTags) && !curTags.includes(newTag)) {
          const tagObject = {
            id: Date.now(),
            name: newTag,
            createdAt: new Date(Date.now()).toISOString(),
          };
          setTag(tagObject); // Update the tag state

          addTag(JSON.stringify(tagObject))
            .then((response) => {
              curTags.push(tagObject); // Update the current tags
              inputElement.value = ""; // Clear the input field
            })
            .catch((error) => console.error("Error adding tag:", error));
        } else {
          console.warn("Tag already exists or invalid input.");
        }
      } else {
        console.warn("Tag name cannot be empty.");
      }
    };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <br />
        <div className="modal-body">
            <input
                type="text"
                id="tagName"
                name="tagName"
                className="tag-input"
                placeholder="Enter a tag name"
            />
            <button
                className="save-button"
                onClick={() => {addNewTag(); 
                    onClose(); 
                    if (onTagAdded) {
                        onTagAdded(tag);
                    }
                }}
            >
                Save
            </button>
        </div>
      </div>
    </div>
  );
};

export default NewTagModal;