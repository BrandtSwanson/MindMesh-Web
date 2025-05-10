import "../../styles/notes/NoteMetadataModal.css"; // Create a CSS file for styling

const NoteMetadataModal = ({ isOpen, onClose, metadata }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
            {metadata.title} Metadata
        </div>
        <br />
        Created at: {metadata.createdAt}
        <br />
        Updated at: {metadata.updatedAt}
        <br />
        id: {metadata.id}
        <br />
        Tags: {metadata.tags}
      </div>
    </div>
  );
};

export default NoteMetadataModal;