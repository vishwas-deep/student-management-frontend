import React from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { credentials } from '../../Credentials';

const Header = ({ title, onProfileClick, goBackBtn, handleGoBack, onLogout }) => {
  const role = localStorage.getItem("role")

  return (
    <header className="bg-pastel-blue text-gray-800 p-4 flex justify-between items-center">
      {goBackBtn && (
        <button
          onClick={handleGoBack}
          className="text-gray-800 py-2 px-2 rounded-md hover:bg-pastel-blue-dark hover:underline transition"
        >
          {`< Go Back`}
        </button>
      )}
      {onProfileClick && (
        <div className="flex items-center cursor-pointer" onClick={onProfileClick}>
          {/* Round Button */}
          <button
            className="w-10 h-10 flex items-center justify-center bg-pastel-purple text-gray-800 rounded-full hover:bg-pastel-purple-dark transition"
          >
            {credentials[role]?.username?.charAt(0)?.toUpperCase()}
          </button>

          {/* Sticky Username Text */}
          <div className="ml-2 bg-pastel-purple-dark text-white py-1 px-3 rounded-r-md border-r-2 border-pastel-purple-dark shadow-md">
            {credentials[role]?.username}
          </div>
        </div>
      )}

      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex space-x-2">
      <div className="w-28">{` `}</div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-800 py-2 px-4 rounded-md hover:bg-pastel-red-dark transition"
          >
            <span>Logout</span>
            <IoLogOutOutline />
          </button>
        ) 
        }
      </div>
    </header>
  );
};

export default Header;
