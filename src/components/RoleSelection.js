// RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRedirect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div
          onClick={() => handleRedirect('admin')}
          className="cursor-pointer p-6 bg-white shadow-lg rounded-lg text-center hover:bg-blue-100 transition"
        >
          <h2 className="text-xl font-bold">Login as Admin</h2>
        </div>
        <div
          onClick={() => handleRedirect('student')}
          className="cursor-pointer p-6 bg-white shadow-lg rounded-lg text-center hover:bg-green-100 transition"
        >
          <h2 className="text-xl font-bold">Login as Student</h2>
        </div>
        <div
          onClick={() => handleRedirect('teacher')}
          className="cursor-pointer p-6 bg-white shadow-lg rounded-lg text-center hover:bg-yellow-100 transition"
        >
          <h2 className="text-xl font-bold">Login as Teacher</h2>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
