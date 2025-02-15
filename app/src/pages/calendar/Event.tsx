import React, { useState, useEffect } from 'react';
import "../../styles/calendar/Event.css"
import TitleBar from '../../components/TitleBar';
import { saveEvent, getEventById, updateEvent, deleteEvent } from "../../api/api";
import { Link, useParams, useNavigate } from "react-router-dom";

export interface Event {
    id:number;
    dtstamp:Date;
    name:string;     // Event name or title
    start:Date;       // Event start time
    end:Date;         // Event end time
    description:string; // Event description
    location:string    // Event location
    status:string;      // Event status (CONFIRMED, TENTATIVE, CANCELLED)
    priority:number;    // Event priority
    organizer:string;   // Organizer information (email, name, etc.)
    class:string;       // Classification (PUBLIC, PRIVATE, CONFIDENTIAL)
    attendees:string[];   // List of attendee emails
}

interface EventProps {
}

const EventComponent: React.FC<EventProps> = () => {
  // State to track edit mode
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { eventId } = useParams();

  // State to hold the event and edited event
  const [event, setEvent] = useState<Event>({
    id: -1,
    name: '',
    dtstamp: new Date(),
    start: new Date(),
    end: new Date(new Date().getTime() + 60 * 60 * 1000),
    description: '',
    location: '',
    status: '',
    priority: 0,
    organizer: '',
    class: '',
    attendees: []
  });

  const [editedEvent, setEditedEvent] = useState<Event>({ ...event });

  useEffect(() => {
    if(parseInt(eventId) == 0)
    {
      setIsEditing(true);
      console.log("SUC");
    }
    else
    {
      console.log("HEREPT2");
      setIsEditing(false);
      getEventById(parseInt(eventId)).then((fetchedEvent) => {
        if (fetchedEvent) {
          console.log("GETS HERE");
          fetchedEvent.start = new Date(fetchedEvent.start);
          fetchedEvent.end = new Date(fetchedEvent.end);
          setEvent(fetchedEvent); // Now 'fetchedEvent' is of type 'Event'
          setEditedEvent(fetchedEvent);
        }
      });
    }
  }, [eventId]);

  // Handler to toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedEvent({ ...event }); // Initialize edit form with current event data
  };

  // Handler to save the changes
  const handleSaveClick = () => {
    setEvent(editedEvent); // Update the event with edited data
    setIsEditing(false);
    onSave();
  };

  // Handler to save the changes
  const handleDeleteClick = () => {
    deleteEvent(parseInt(eventId));
    navigate(`/calendar`);
  };

  const onSave = () => {
    if (editedEvent.name.trim() !== "") {
      if (editedEvent.id == -1)
      {
        editedEvent.id = Date.now()
        editedEvent.dtstamp = new Date();
        saveEvent(JSON.stringify(editedEvent), editedEvent.id)
          .then((response) => {
            // Update the state to include the new note
          })
          .catch((error) => console.error("Error creating note:", error));
          navigate(`/event/${editedEvent.id}`);
      }
      else
      {
        updateEvent(JSON.stringify(editedEvent), editedEvent.id);
        setIsEditing(false);
      }
    } 
  }

  const changeDate = (e, start) => {
      const newDate = new Date(e.target.value)
      newDate.setHours(newDate.getHours() - 5);

    if(!start)
    {
      if(newDate.getTime() < editedEvent.start.getTime())
        console.log("HERLEKJ");
      else
        setEditedEvent((prev) => ({
          ...prev,
          end: newDate,
        }))
    }
    else 
    {
      if(newDate.getTime() > editedEvent.end.getTime())
        console.log("HERLEKJ");
      else
        setEditedEvent((prev) => ({
          ...prev,
          start: newDate,
        }))
    }
  }

  // Handler to cancel editing
  const handleCancelClick = () => {
    setIsEditing(false); // Exit edit mode without saving
    if(parseInt(eventId) == 0)
      navigate(`/calendar`);
  };

  // Handler to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="app">
        <TitleBar text=''></TitleBar>
    <div className="event">
      {isEditing ? (
        // Editable form
        <div className="view-event">
          <input
            className="event-input"
            type="text"
            name="name"
            value={editedEvent.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            className="event-input"
            type="text"
            name="location"
            value={editedEvent.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            className="event-input"
            name="description"
            value={editedEvent.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            className="event-input"
            type="datetime-local"
            name="start"
            value={editedEvent.start.toISOString().slice(0, 16)}
            onChange={(e) =>
              changeDate(e, true)
            }
          />
          <input
            className="event-input"
            type="datetime-local"
            name="end"
            value={editedEvent.end.toISOString().slice(0, 16)}
            onChange={(e) =>
              changeDate(e, false)}
          /> 
          <input
          className="event-input"
          type="text"
          name="status"
          value={editedEvent.status}
          onChange={handleChange}
          placeholder="Status"
        />
      
        {/* Priority Input */}
        <input
          className="event-input"
          type="number"
          name="priority"
          value={editedEvent.priority}
          onChange={handleChange}
          placeholder="Priority"
        />
      
        {/* Organizer Input */}
        <input
          className="event-input"
          type="text"
          name="organizer"
          value={editedEvent.organizer}
          onChange={handleChange}
          placeholder="Organizer"
        />
      
        {/* Class Input */}
        <input
          className="event-input"
          type="text"
          name="class"
          value={editedEvent.class}
          onChange={handleChange}
          placeholder="Class"
        />
      
        {/* Attendees Input (comma-separated) */}
        <input
          className="event-input"
          type="text"
          name="attendees"
          value={editedEvent.attendees.join(', ')} // Display attendees as comma-separated
          onChange={(e) =>
            setEditedEvent((prev) => ({
              ...prev,
              attendees: e.target.value.split(',').map((attendee) => attendee.trim()), // Split comma-separated attendees
            }))
          }
          placeholder="Attendees (comma-separated)"
        />
          <button  className="event-button"onClick={handleSaveClick}>Save</button>
          <button  className="event-button"onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        // Display mode
        <div className="view-event">
          <div className="event-name">{event.name}</div>
          <div className="event-location">{event.location}</div>
          <div className="event-time">
            {new Date(event.start).toLocaleTimeString()} - {new Date(event.end).toLocaleTimeString()}
          </div>
          <div className="event-description">{event.description}</div>
          <button className="event-button" onClick={handleEditClick}>Edit</button>
          <button className="event-button" onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default EventComponent;
