import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the shared header
import AdminDashboard from '../admin/AdminDashboard';
import StudentDashboard from '../student/StudentDashboard';
import TeacherDashboard from '../teacher/TeacherDashboard';
import { useAuth } from '../../context/AuthContext';

const Dashboard = ({ role }) => {
  const { logout } = useAuth(); // Use the context to get the login function

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/${role}-profile`);
  };

  const handleLogout = () => {
    logout()
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title={`Welcome to the ${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout} // Pass logout handler to Header
      />
      <main className="p-6">
        {/* Admin Dashboard Content */}
        {role === 'admin' && <AdminDashboard/>}
        
        {/* Student Dashboard Content */}
        {role === 'student' && <StudentDashboard/>}

        {/* Teacher Dashboard Content */}
        {role === 'teacher' && <TeacherDashboard/>}
      </main>
    </div>
  );
};

export default Dashboard;
