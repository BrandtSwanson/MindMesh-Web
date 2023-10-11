import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from '../pages/notes/Note';
import NoteDetail from '../pages/notes/NoteDetail';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:noteId" element={<NoteDetail/>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;