import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import DonorDashboard from './pages/DonorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AcceptorDashboard } from './pages/AcceptorDashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const { userData } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={userData ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="donor" element={<DonorDashboard />} />
          <Route 
            path="admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="acceptor" element={<AcceptorDashboard />} />
          <Route index element={<Navigate to="/donor" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;