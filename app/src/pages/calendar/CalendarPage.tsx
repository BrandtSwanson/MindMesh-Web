// src/App.tsx
import React from 'react';
import Calendar from './Calendar';
import TitleBar from '../../components/TitleBar';

const CalendarPage: React.FC = () => {
  return (
    <div className="app">
      <TitleBar text=""></TitleBar>
      <Calendar />
    </div>
  );
}

export default CalendarPage;
