import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const InputField = ({ label, type = 'text', name, value, onChange, required = true, options = [] }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const renderInputField = () => {
    const inputId = `input-${name}`;

    switch (type) {
      case 'select':
        return (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            className="cursor-pointer block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer"
            required={required}
          >
            <option value="" disabled>Select</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'password':
        return (
          <div className="relative">
            <input
              id={inputId}
              autoComplete="off"
              type={isPasswordVisible ? 'text' : 'password'}
              name={name}
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer"
              placeholder=" "
              required={required}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        );
      default:
        return (
          <input
            id={inputId}
            autoComplete="off"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer"
            placeholder=" "
            required={required}
          />
        );
    }
  };

  return (
    <div className="relative z-0 w-full mb-6 group">
      {renderInputField()}
      <label
        htmlFor={`input-${name}`}
        className={`cursor-auto absolute text-sm text-gray-500 duration-300 transform ${isFocused || value ? '-translate-y-1/2 scale-75' : 'scale-100 translate-y-3'
          } top-0 left-2 px-2 bg-white origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-1/2 peer-focus:px-2 peer-focus:bg-white`}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
