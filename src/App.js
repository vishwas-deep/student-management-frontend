import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import Login from './components/common/Login';
import Dashboard from './components/common/Dashboard';
import Profile from './components/common/Profile';
import { AdminProfileData } from './components/admin/AdminProfileData';
import { StudentProfileData } from './components/student/StudentProfileData';
import { TeacherProfileData } from './components/teacher/TeacherProfileData';
import ClassAnalytics from './components/ClassAnalytics';
import IncomeExpenseAnalytics from './components/IncomeExpenseAnalytics';
import ClassManagement from './components/ClassManagement';
import StudentManagement from './components/student/StudentManagement';
import TeacherManagement from './components/teacher/TeacherManagement';
import StudentAnalyticsCard from './components/StudentAnalytics';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login/:role" element={<Login />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin-dashboard" element={<Dashboard role="admin" />} />
            <Route path="/student-dashboard" element={<Dashboard role="student" />} />
            <Route path="/teacher-dashboard" element={<Dashboard role="teacher" />} />
            <Route path="/admin-profile" element={<Profile role="admin" data={AdminProfileData} />} />
            <Route path="/student-profile" element={<Profile role="student" data={StudentProfileData} />} />
            <Route path="/teacher-profile" element={<Profile role="teacher" data={TeacherProfileData} />} />
            <Route path="/admin/class-management" element={<ClassManagement />} />
            <Route path="/admin/teacher-management" element={<TeacherManagement />} />
            <Route path="/admin/student-management" element={<StudentManagement />} />
            <Route path="/admin/class-analytics/:id" element={<ClassAnalytics />} />
            <Route path="/admin/income-expense-analytics" element={<IncomeExpenseAnalytics />} />
            <Route path="/admin/student-analytics" element={<StudentAnalyticsCard />} />
          </Route>

          {/* Catch-all route for unknown URLs */}
          <Route path="*" element={<ProtectedRoute />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
