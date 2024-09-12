import React, { useEffect, useState } from 'react';
import '../../styles/calendar/Calendar.css';
import Event from './Event';
import { Link, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarDay: React.FC = () => {
    const { month, day, year } = useParams<{ month: string; day: string; year: string }>();
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [events, setEvents] = useState<Event[]>([]); // Events state

  useEffect(() => {
    // Log to check the values
    console.log("Month:", month);
    setCurrentMonth(parseInt(month)-1);
    console.log("Day:", day);
    setCurrentDay(parseInt(day));
    console.log("Year:", year);
    setCurrentYear(parseInt(year));

    // You can now use month, day, and year as needed
  }, [month, day, year]);

  const lastDay = () => {
    const prevDate = new Date(currentYear, currentMonth, currentDay - 1);
    setCurrentMonth(prevDate.getMonth());
    setCurrentDay(prevDate.getDate());
    setCurrentYear(prevDate.getFullYear());
  };

  const nextDay = () => {
    const nextDate = new Date(currentYear, currentMonth, currentDay + 1);
    setCurrentMonth(nextDate.getMonth());
    setCurrentDay(nextDate.getDate());
    setCurrentYear(nextDate.getFullYear());
  };

  const todaysDate = () => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setCurrentDay(today.getDate());
  };

  const getEventsForCurrentDay = () => {
    // return events.filter(
    //   (event) => event.date.getDate() === currentDay &&
    //              event.date.getMonth() === currentMonth &&
    //              event.date.getFullYear() === currentYear
    // );
    return [];
  };

  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
    <div className="calendar-page">
      <h1 className="calendar-month">
        {monthsOfYear[currentMonth]} {currentYear} - {daysOfWeek[new Date(currentYear, currentMonth, currentDay).getDay()]}, {currentDay}
      </h1>
      <span>
        <button className="change-month" onClick={todaysDate}>Today's Date</button>
        <button className="change-month" onClick={lastDay}>Last Day</button>
        <button className="change-month" onClick={nextDay}>Next Day</button>
        <Link to="/event">
            <button className="change-month">Create Event</button>
        </Link>
      </span>

      <div className="day-events">
        <h2>Events for {currentMonth + 1}/{currentDay}/{currentYear}:</h2>
        {/* {getEventsForCurrentDay().length > 0 ? (
          getEventsForCurrentDay().map((event) => (
            <Event key={event.id} event={event} />
          ))
        ) : (
          <p>No events for this day.</p>
        )} */}
      </div>
    </div>
    </div>
  );
};

export default CalendarDay;
