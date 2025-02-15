import React from "react";
import '../../styles/calendar/EventTile.css';

const EventTile = ({ event }) => {
  return (
    <div className="event-tile">
      <h3 className="event-title">{event.name}</h3>
      <div className="event-tile-time">
        {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default EventTile;
