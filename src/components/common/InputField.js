import React from 'react';

const InputField = ({ label, type = 'text', name, value, onChange, required = true, options = [] }) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer"
          required={required}
        >
          <option value="" disabled>Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
         autocomplete="off"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer"
          placeholder=" "
          required={required}
        />
      )}
      <label
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
