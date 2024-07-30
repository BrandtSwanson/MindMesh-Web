import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from '../pages/notes/Note';
import CalendarPage from '../pages/calendar/CalendarPage';
import HomePage from '../pages/home/Home'
import NoteDetail from '../pages/notes/NoteDetail';
import Assistant from '../pages/assistant/Assistant';

type Props = {
}

const AppRoutes = ({}: Props) => (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:noteId" element={<NoteDetail/>} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/assistant" element={<Assistant/>} />
      </Routes>
    </Router>
  )

export default AppRoutes;