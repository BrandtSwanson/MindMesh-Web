import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from '../pages/notes/Note';
import CalendarPage from '../pages/calendar/CalendarPage';
import HomePage from '../pages/home/Home'
import NoteDetail from '../pages/notes/NoteDetail';
import Personal from '../pages/personal/Personal'
import ExternalKnowledge from '../pages/external-knowledge/external-knowledge';
import KnowledgeBase from '../pages/knowledge-base/KnowledgeBase';
import Strava from '../pages/external-knowledge/strava';
import CalendarDay from '../pages/calendar/CalendarDay';
import Event from '../pages/calendar/Event';
import AgentConfig from '../pages/agents/AgentConfig';
import HealthPage from '../pages/health/health';
import AgentLibrary from '../pages/agents/AgentLibrary';
import Agent from '../pages/agents/Agent';
import FinanceDashboard from '../pages/finance/Dashboard';
import Budget from '../pages/finance/Budget';
import Accounts from '../pages/finance/Accounts';
import Transactions from '../pages/finance/Transactions';
import AccountDetail from '../pages/finance/AccountDetail';
import BudgetDetail from '../pages/finance/BudgetDetail';
import Tags from '../pages/tags/Tags';
import TagDetail from '../pages/tags/TagDetail';

type Props = {
}

const AppRoutes = ({}: Props) => (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:noteId" element={<NoteDetail/>} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/calendar/:month/:day/:year" element={<CalendarDay />} />
        <Route path="/agents" element={<AgentLibrary/>} />
        <Route path="/new-agent" element={<AgentConfig/>} />
        <Route path="/agent/:agentId" element={<Agent/>} />
        <Route path="/agents/e/:agentId" element={<AgentConfig/>} />
        <Route path="/knowledgebase" element={<KnowledgeBase/>} />
        <Route path="/personal" element={<Personal/>} />
        <Route path="/external" element={<ExternalKnowledge/>} />
        <Route path="/health" element={<HealthPage/>} />
        <Route path="/strava" element={<Strava/>} />
        <Route path="/event/:eventId" element={<Event/>} />
        <Route path="/finance" element={<FinanceDashboard/>} />
        <Route path="/budget" element={<Budget/>} />
        <Route path="/budget/:budgetId" element={<BudgetDetail/>} />
        <Route path="/accounts" element={<Accounts/>} />
        <Route path="/accounts/:accountId" element={<AccountDetail/>} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/tags" element={<Tags/>} />
        <Route path="/tags/:tagId" element={<TagDetail/>} />
      </Routes>
    </Router>
  )

export default AppRoutes;