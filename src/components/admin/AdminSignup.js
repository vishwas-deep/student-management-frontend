// AdminSignup.js
import React, { useState } from 'react';
import InputField from '../common/InputField';

const AdminSignup = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle sign-up logic here (e.g., call an API)
    console.log('Sign up as admin', { username, password });
    onSignUp(); // Callback to notify parent about successful signup
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
    </div>
  );
};

export default AdminSignup;
