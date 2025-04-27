import React from 'react';
import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Employees from './pages/Employees/Employees';
import Categories from './pages/Categories/Categories';
import DailyReports from './pages/DailyReports/DailyReports';
import Areas from './pages/Areas/Areas';
import ConcreteComposition from './pages/ConcreteComposition/ConcreteComposition';
import MasonryComposition from './pages/MasonryComposition/MasonryComposition';
import PriceList from './pages/PriceList/PriceList';
import Users from './pages/Users/Users';
import Projects from './pages/Projects/Projects';

// Protected route component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated on app load
    checkAuth();
  }, [checkAuth]);
  
  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (isAuthenticated && window.location.pathname === '/login') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="categories" element={<Categories />} />
        <Route path="daily-reports" element={<DailyReports />} />
        <Route path="areas" element={<Areas />} />
        <Route path="concrete-composition" element={<ConcreteComposition />} />
        <Route path="masonry-composition" element={<MasonryComposition />} />
        <Route path="price-list" element={<PriceList />} />
        
        {/* Admin only routes */}
        <Route path="users" element={
          <ProtectedRoute adminOnly={true}>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="projects" element={
          <ProtectedRoute adminOnly={true}>
            <Projects />
          </ProtectedRoute>
        } />
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;