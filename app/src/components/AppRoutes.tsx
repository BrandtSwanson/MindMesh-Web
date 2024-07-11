import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from '../pages/notes/Note';
import Sample from '../pages/calendar/Sample';
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
        <Route path="/calendar" element={<Sample />} />
        <Route path="/assistant" element={<Assistant/>} />
      </Routes>
    </Router>
  )

export default AppRoutes;