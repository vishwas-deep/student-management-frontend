import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRedirect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h3 className="text-2xl font-bold mb-8 text-slate-700">Welcome to School CRM app</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Admin Card */}
        <div
          onClick={() => handleRedirect('admin')}
          className="max-w-sm cursor-pointer p-6 bg-white shadow-lg rounded-lg text-center transform transition hover:scale-105"
        >
          <img src="/admin.jpg" alt="Admin" className="w-full h-48 object-contain rounded-md mb-4"/>
          <h3 className="text-xl font-bold text-slate-600">Login as Admin</h3>
          <p className='text-slate-500 text-sm'>Admin have view and edit access to teacher's and student's data</p>
        </div>

        {/* Student Card */}
        <div
          onClick={() => handleRedirect('student')}
          className="max-w-sm cursor-pointer p-6 bg-white shadow-lg rounded-lg text-center transform transition hover:scale-105"
        >
          <img src="/students.jpg" alt="Student" className="w-full h-48 object-contain rounded-md mb-4"/>
          <h3 className="text-xl font-bold text-slate-600">Login as Student</h3>
          <p className='text-slate-500 text-sm'>Teacher have access to view their personal and class data</p>
        </div>

        {/* Teacher Card */}
        <div
          onClick={() => handleRedirect('teacher')}
          className="max-w-sm cursor-pointer p-6 bg-white shadow-lg rounded-lg text-center transform transition hover:scale-105"
        >
          <img src="/teacher.jpg" alt="Teacher" className="w-full h-48 object-contain rounded-md mb-4"/>
          <h3 className="text-xl font-bold text-slate-600">Login as Teacher</h3>
          <p className='text-slate-500 text-sm'>Student have access to view their personal and class data</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;