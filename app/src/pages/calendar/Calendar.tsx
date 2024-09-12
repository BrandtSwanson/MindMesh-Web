import React, { useEffect, useState } from 'react';
import '../../styles/calendar/Calendar.css';
import Event from './Event';
import { Link } from 'react-router-dom';

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
  }, [currentMonth, currentYear]);

  return (
    <div className="calendar">
      <h1 className="calendar-month">
        {monthsOfYear[currentMonth]} {currentYear}
      </h1>
      <span><button className="change-month" onClick={todaysDate}>Today's Date</button>
      <button className="change-month" onClick={lastMonth}>Last Month</button>
      <button className="change-month" onClick={nextMonth}>Next Month</button>
      <Link to="/event/0">
        <button className="change-month">Create Event</button>
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
                {/* {events
                  .filter(
                    (event) =>
                      event.date.getDate() === day &&
                      event.date.getMonth() === currentMonth &&
                      event.date.getFullYear() === currentYear
                  )
                  .map((event) => (
                    <Event key={event.id} event={event} />
                  ))} */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
