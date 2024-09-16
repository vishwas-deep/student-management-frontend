import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import AdminSignup from '../admin/AdminSignup';
import { useAuth } from '../../context/AuthContext'; // Import the context

const Login = () => {
  const { role } = useParams(); // Get the role (admin, student, teacher) from the URL
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state between login and signup
  const navigate = useNavigate(); // For redirection
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const { login } = useAuth(); // Use the context to get the login function

  // Define credentials for each role
  const credentials = {
    admin: { username: 'admin@school.com', password: 'admin' },
    student: { username: 'student@school.com', password: 'student' },
    teacher: { username: 'teacher@school.com', password: 'teacher' },
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials based on role
    const validCredentials = credentials[role];

    if (!validCredentials ||
      username !== validCredentials.username ||
      password !== validCredentials.password) {
      // Invalid credentials, show an error message
      setErrorMessage('Invalid username or password. Please try again.');
      return;
    }

    // If credentials are valid, clear error and redirect
    setErrorMessage('');
    console.log(`Login as ${role} with`, { username, password });

    // After successful login, redirect to dashboard
    navigate(`/${role}-dashboard`);
    login(role); // Update auth state and redirect

  };

  const handleSignUpSuccess = () => {
    // Callback to handle sign-up success
    setIsSignUp(false); // Go back to login after successful sign-up
  };

  return (
    <div className="flex min-h-screen h-screen overflow-hidden">
      {/* Left side image */}
      <div className="w-1/2 h-full">
        <img src="/login.jpg" alt="Login" className="object-cover w-full h-full" />
      </div>

      {/* Right side login form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white-100 h-full">
        {/* Banner message for admin login */}
        {!isSignUp && (
          <div className="bg-slate-100 text-slate-500 p-2 rounded-lg shadow-md w-full max-w-xs text-center mb-2">
            <p className="flex flex-col justify-between text-sm font-normal">
              <span>
                <strong className="font-medium">Username:</strong> {credentials[role]?.username}
              </span>
              <span>
                <strong className="font-medium">Password:</strong> {credentials[role]?.password}
              </span>
            </p>
          </div>
        )}

        {/* Login Card */}
        <div className="p-6 bg-slate-50 shadow-lg shadow-indigo-500/40 rounded-lg w-full max-w-xs">
          {!isSignUp ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center">
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

              {/* Error message */}
              {errorMessage && (
                <div className="mt-4 text-center text-red-500">
                  {errorMessage}
                </div>
              )}

              {/* Show Sign-Up for Admin only */}
              {role === 'admin' && (
                <div className="mt-4 text-center">
                  <h3 className="inline-flex items-center text-sm font-medium text-gray-600">
                    Don't have an account?&nbsp;
                    <a
                      onClick={() => setIsSignUp(true)} // Show the signup form
                      className="text-blue-500 underline cursor-pointer hover:text-green-600 transition"
                    >
                      Sign In
                    </a>
                  </h3>
                </div>
              )}
            </>
          ) : (
            // Render the AdminSignup component
            <AdminSignup
              onSignUp={handleSignUpSuccess}
              backToLogin={() => setIsSignUp(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

