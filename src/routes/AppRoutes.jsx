import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import Dashboard from '../pages/Dashboard';
import SurveyBuilder from '../features/builder/SurveyBuilder';
import TakeSurvey from '../pages/TakeSurvey';
import SurveyDisplay from '../pages/SurveyDisplay';
import AnalyzePage from '../pages/AnalyzePage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/builder" element={<SurveyBuilder />} />
    <Route path="/take-survey/:surveyId" element={<TakeSurvey />} />
    <Route path="/survey/:surveyId" element={<SurveyDisplay />} />
    <Route path="/analyze/:surveyId" element={<AnalyzePage />} />
  </Routes>
);

export default AppRoutes;
