import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, UserPlus, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="sidebar bg-white shadow-lg" style={{ width: '250px', height: '100vh' }}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Blood Bank</h2>
        <nav className="d-flex flex-column gap-2">
          <Link 
            to="/admin"
            className={`btn ${location.pathname === '/admin' ? 'btn-danger' : 'btn-outline-danger'} w-100 text-start`}
          >
            <Settings className="me-2" size={20} />
            Admin
          </Link>
          <Link 
            to="/donor"
            className={`btn ${location.pathname === '/donor' ? 'btn-danger' : 'btn-outline-danger'} w-100 text-start`}
          >
            <UserPlus className="me-2" size={20} />
            Donor
          </Link>
          <Link 
            to="/acceptor"
            className={`btn ${location.pathname === '/acceptor' ? 'btn-danger' : 'btn-outline-danger'} w-100 text-start`}
          >
            <UserCheck className="me-2" size={20} />
            Acceptor
          </Link>
          <button 
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 text-start mt-4"
          >
            <LogOut className="me-2" size={20} />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;