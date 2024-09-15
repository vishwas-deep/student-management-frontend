import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the shared header
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { FaBookOpenReader } from "react-icons/fa6";
import { DiGoogleAnalytics } from "react-icons/di";
import { TbDeviceAnalytics } from "react-icons/tb";

const Dashboard = ({ role }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/${role}-profile`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title={`${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`}
        onProfileClick={handleProfileClick}
      />
      <main className="p-6">
        <p className="text-xl font-semibold mb-6">
          Welcome to the {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </p>

        {/* Admin Dashboard Content */}
        {role === 'admin' && (
          <div className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Class Management Card */}
              <div
                onClick={() => navigate('/admin/class-management')}
                className="bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <FaBookOpenReader style={{ width: '5rem', height: '5rem' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Manage Classes</h3>
                <p className="text-gray-500">Create, update, or view classes</p>
              </div>

              {/* Teacher Management Card */}
              <div
                onClick={() => navigate('/admin/teacher-management')}
                className="bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <GiTeacher style={{ width: '5rem', height: '5rem' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Manage Teachers</h3>
                <p className="text-gray-500">Add, update, or remove teachers</p>
              </div>

              {/* Student Management Card */}
              <div
                onClick={() => navigate('/admin/student-management')}
                className="bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <PiStudentFill style={{ width: '5rem', height: '5rem' }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Manage Students</h3>
                <p className="text-gray-500">Add, update, or remove students</p>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income/Expense Analytics Card */}
              <div
                onClick={() => navigate('/admin/income-expense-analytics')}
                className="bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <TbDeviceAnalytics style={{ width: '5rem', height: '5rem' }}/>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">View Income/Expense Analytics</h3>
                <p className="text-gray-500">Analyze financial reports</p>
              </div>

              {/* Student Analytics Card */}
              <div
                onClick={() => navigate('/admin/student-analytics')}
                className="bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  <DiGoogleAnalytics style={{ width: '5rem', height: '5rem' }}/>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">View Student Analytics</h3>
                <p className="text-gray-500">Analyze student demographics</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
