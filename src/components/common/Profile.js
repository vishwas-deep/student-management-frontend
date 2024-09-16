// Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header'; // Import the shared header
import { credentials } from '../../Credentials';
import { CgProfile } from "react-icons/cg";

const Profile = ({ role, data }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-green-100">
      <Header
        title={`${role.charAt(0).toUpperCase() + role.slice(1)} Profile`}
        goBackBtn={true}
        handleGoBack={handleGoBack}
      />
      <main className="mt-6 mx-auto max-w-4xl p-6">
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <CgProfile style={{ width: '5rem', height: '5rem' }} className="text-green-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 text-green-500">Login Details</h2>

        {/* Card Content */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <p className="text-lg mb-2">
            <strong className="text-green-500">{`Username: `}</strong>
            {data.username || credentials[role].username}
          </p>
          <p className="text-lg mb-2">
            <strong className="text-green-500">{`Email: `}</strong>
            {data.email || `${role}@school.com`}
          </p>
          <p className="text-lg mb-2">
            <strong className="text-green-500">{`Password: `}</strong>
            {data.password || credentials[role].password}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Profile;

