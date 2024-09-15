import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import AdminSignup from '../admin/AdminSignup';

const Login = () => {
  const { role } = useParams(); // Get the role (admin, student, teacher) from the URL
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state between login and signup
  const navigate = useNavigate(); // For redirection

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(`Login as ${role} with`, { username, password });
    
    // After successful login, redirect to dashboard
    navigate(`/${role}-dashboard`);
  };

  const handleSignUpSuccess = () => {
    // Callback to handle sign-up success
    setIsSignUp(false); // Go back to login after successful sign-up
    navigate(`/${role}-dashboard`);
  };

  return (
    <div className="flex justify-center   items-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        {!isSignUp ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {role === 'admin' ? 'Admin Login' : role === 'student' ? 'Student Login' : 'Teacher Login'}
            </h2>
            <form onSubmit={handleLogin}>
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
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>

            {/* Show Sign-Up for Admin only */}
            {role === 'admin' && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">Don't have an account?</h3>
                <button
                  onClick={() => setIsSignUp(true)} // Show the signup form
                  className="mt-2 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                  Sign Up as Admin
                </button>
              </div>
            )}
          </>
        ) : (
          // Render the AdminSignup component
          <AdminSignup onSignUp={handleSignUpSuccess} />
        )}
      </div>
    </div>
  );
};

export default Login;
