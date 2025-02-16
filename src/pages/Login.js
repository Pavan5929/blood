// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm'; // Make sure AuthForm.js is in this location
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (userData) => {
    login(userData);
    navigate(`/${userData.role || 'donor'}`);
  };

  return (
    <div className="body">
      <AuthForm onLogin={handleLogin} />
    </div>
  );
};

export default Login; // This is the correct way to export