import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from '../pages/notes/Note';
import Goals from '../pages/calendar/Goals';
import HomePage from '../pages/home/Home'
import NoteDetail from '../pages/notes/NoteDetail';
import GoalDetail from '../pages/calendar/GoalDetail';
import Assistant from '../pages/assistant/Assistant';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:noteId" element={<NoteDetail/>} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/goals/:goalId" element={<GoalDetail/>} />
        <Route path="/assistant" element={<Assistant/>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;