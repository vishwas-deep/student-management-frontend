// components/common/Overlay.js
import React from 'react';

const Overlay = ({ message, onClose, closeMessage }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">{message}</h2>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          {closeMessage}
        </button>
      </div>
    </div>
  );
};

export default Overlay;
