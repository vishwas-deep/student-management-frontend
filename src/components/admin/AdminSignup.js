import React, { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import Overlay from '../common/Overlay'; // Import the new Overlay component
import { useNavigate } from 'react-router-dom'; // Import navigate

const AdminSignup = ({ onSignUp, backToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility
  const navigate = useNavigate(); // For redirection

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle sign-up logic here (e.g., call an API)
    console.log('Sign up as admin', { username, password });
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false); // Hide overlay when user clicks 'Close'
    onSignUp(); // Notify parent component about the successful sign-up
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <InputField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Back to Login Button */}
      <div className="mt-4 text-center">
        <h3 className="inline-flex items-center text-sm font-medium text-gray-600">
          Already have an account?&nbsp;
          <a
            onClick={backToLogin}
            className="text-blue-500 underline cursor-pointer hover:text-green-600 transition"
          >
            Login
          </a>
        </h3>
      </div>

      {/* Render the Overlay component if showOverlay is true */}
      {showOverlay && (
        <Overlay
          message="Sign Up Successful!"
          onClose={handleCloseOverlay}
          closeMessage={"Back to login"}
        />
      )}
    </div>
  );
};

export default AdminSignup;
