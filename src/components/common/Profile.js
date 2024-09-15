// Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header'; // Import the shared header

const Profile = ({ role, data }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title={`${role.charAt(0).toUpperCase() + role.slice(1)} Profile`}
        goBackBtn={true}
        handleGoBack={handleGoBack}
      />
      <main className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        <p><strong>Username:</strong> {data.username}</p>
        <p><strong>Email:</strong> {data.email}</p>
        {/* Add more fields as needed */}
      </main>
    </div>
  );
};

export default Profile;
