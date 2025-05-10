import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ServersPage from './pages/ServersPage';
import SubscribePage from './pages/SubscribePage';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminServersPage from './pages/admin/AdminServersPage';
import AdminDiscountCodesPage from './pages/admin/AdminDiscountCodesPage';

// Components
import RouteGuard from './components/RouteGuard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected User Routes */}
        <Route element={<RouteGuard requiredRole="user" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/servers" element={<ServersPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
        </Route>
        
        {/* Protected Admin Routes */}
        <Route element={<RouteGuard requiredRole="admin" />}>
          <Route path="/admin/overview" element={<AdminOverviewPage />} />
          <Route path="/admin/servers" element={<AdminServersPage />} />
          <Route path="/admin/discount-codes" element={<AdminDiscountCodesPage />} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;