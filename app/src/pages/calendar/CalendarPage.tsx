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
      <h1>Hello</h1>
      <br></br>
      <h1>Hello</h1>
      <Calendar />
    </div>
  );
}

export default CalendarPage;
