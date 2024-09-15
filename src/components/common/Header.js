import React from 'react';
import { IoLogOutOutline } from "react-icons/io5";

const Header = ({ title, onProfileClick, goBackBtn, handleGoBack, onLogout }) => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      {goBackBtn && (
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600 hover:underline transition"
        >
          {`< Go Back`}
        </button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex space-x-2">
        {onProfileClick && (
          <button
            onClick={onProfileClick}
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405M19 17V7l-5 5-5-5v10"
              ></path>
            </svg>
          </button>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-white py-2 px-4 rounded-md hover:bg-red-500 transition"
          >
            <span>Logout</span>
             <IoLogOutOutline/>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
