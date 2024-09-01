// src/Calendar.tsx
import React from 'react';
import '../../styles/calendar/Calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar: React.FC = () => {
  // Get the current date
  const currentDate = new Date();
  
  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
  // Get the last day of the month
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // Get the number of days in the month
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get the day of the week the month starts on
  const startDay = firstDayOfMonth.getDay();
  
  // Create an array for the days in the month
  const daysArray = [];
  for (let i = 0; i < startDay; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }
  
  return (
    <div className="calendar">
      <div className="calendar-header">
        <h1>{monthsOfYear[currentDate.getMonth()]}</h1>
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-header-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {daysArray.map((day, index) => (
          <div key={index} className="calendar-cell">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
