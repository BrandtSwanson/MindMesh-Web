// src/App.tsx
import React from 'react';
import Calendar from './Calendar';
import TitleBar from '../../components/TitleBar';
import "../../styles/global/App.css";
import "../../styles/calendar/Calendar.css";

const CalendarPage: React.FC = () => {
  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <div className="calendar-page">
        <Calendar />
      </div>
    </div>
  );
}

export default CalendarPage;
