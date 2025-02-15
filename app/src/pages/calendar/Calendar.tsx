import React, { useEffect, useState } from 'react';
import '../../styles/calendar/Calendar.css';
import { Event } from './Event';
import { Link } from 'react-router-dom';
import { getEvents } from '../../api/api'
import EventTile from './EventTile';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysArray, setDaysArray] = useState<(number | null)[]>([]);
  const [events, setEvents] = useState<Event[]>([]); // State to store events

  const updateCalendar = (month: number, year: number) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    // Fill leading nulls for the starting day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Fill the actual days of the month
    for (let i = 1; i <= lastDayOfMonth; i++) {
      days.push(i);
    }

    setDaysArray(days);
  };

  const lastMonth = () => {
    if (currentMonth === 0) {
      // Go to December of the previous year
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      // Go to January of the next year
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const todaysDate = () => {
    setCurrentYear(new Date().getFullYear());
    setCurrentMonth(new Date().getMonth());
  };

  useEffect(() => {
    updateCalendar(currentMonth, currentYear);
    
    getEvents()
      .then((response) => setEvents(response.data || []))
      .catch((error) => console.error("Error fetching notes:", error));

      // events && events.length > 0 && (
      //   events.map((event) => (
      //     console.log(event)
      //   )))
  }, [currentMonth, currentYear, events]);

  return (
    <div className="calendar">
      <h1 className="calendar-month">
        {monthsOfYear[currentMonth]} {currentYear}
      </h1>
      <span><button className="calendar-button" onClick={todaysDate}>Today's Date</button>
      <button className="calendar-button" onClick={lastMonth}>Last Month</button>
      <button className="calendar-button" onClick={nextMonth}>Next Month</button>
      <Link to="/event/0">
        <button className="calendar-button">Create Event</button>
      </Link>
      </span>
      <div className="calendar-header">
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-header-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {daysArray.map((day, index) => (
          <Link to={`/calendar/${currentMonth + 1}/${day}/${currentYear}`} className="link" >
            <div key={index} className="calendar-cell">
              {day}
              <div className="events">
              {events
                .filter(
                  (event) =>
                    new Date(event.start).getDate() === day &&
                    new Date(event.start).getMonth() === currentMonth &&
                    new Date(event.start).getFullYear() === currentYear
                )
                .map((event) => {
                  return <Link className="event-link" to={`/event/${event.id}` }><EventTile key={event.id} event={event} /></Link>;
                })}

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
