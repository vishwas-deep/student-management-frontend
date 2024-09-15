import React, { useState } from 'react';
import Form from './common/Form';
import Table from './common/Table';
import { useNavigate } from 'react-router-dom';
import Header from './common/Header';
import InputField from './common/InputField';

const ClassManagement = () => {
  // Dummy class data
  const [classes, setClasses] = useState([
    {
      className: 'Class 1',
      year: 2023,
      teacher: 'Mr. Smith',
      fees: 1000,
      students: ['John', 'Alice', 'Bob']
    },
    {
      className: 'Class 2',
      year: 2023,
      teacher: 'Ms. Johnson',
      fees: 1500,
      students: ['Steve', 'Mark', 'Sarah']
    },
    {
      className: 'Class 3',
      year: 2023,
      teacher: 'Mrs. Brown',
      fees: 1200,
      students: ['Emily', 'Daniel', 'Sophia']
    },
    {
      className: 'Class 4',
      year: 2023,
      teacher: 'Mr. White',
      fees: 1300,
      students: ['Liam', 'Olivia', 'James']
    },
    {
      className: 'Class 5',
      year: 2023,
      teacher: 'Ms. Davis',
      fees: 1400,
      students: ['Benjamin', 'Chloe', 'Lucas']
    },
    {
      className: 'Class 6',
      year: 2023,
      teacher: 'Mr. Wilson',
      fees: 1500,
      students: ['Mason', 'Ella', 'Henry']
    },
    {
      className: 'Class 7',
      year: 2023,
      teacher: 'Mrs. Martinez',
      fees: 1600,
      students: ['Harper', 'Elijah', 'Isabella']
    },
    {
      className: 'Class 8',
      year: 2023,
      teacher: 'Mr. Anderson',
      fees: 1700,
      students: ['Michael', 'Mia', 'David']
    },
    {
      className: 'Class 9',
      year: 2023,
      teacher: 'Ms. Thompson',
      fees: 1800,
      students: ['Aiden', 'Emma', 'Noah']
    },
    {
      className: 'Class 10',
      year: 2023,
      teacher: 'Mr. Johnson',
      fees: 1900,
      students: ['Sophia', 'Lucas', 'Grace']
    },
    {
      className: 'Class 11',
      year: 2023,
      teacher: 'Mrs. Clark',
      fees: 2000,
      students: ['Olivia', 'Samuel', 'Ethan']
    },
    {
      className: 'Class 12',
      year: 2023,
      teacher: 'Mr. Scott',
      fees: 2100,
      students: ['Ava', 'Jackson', 'Zoe']
    }
  ]);

  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 5;

  // Filter classes based on the search query
  const filteredClasses = classes.filter((cls) =>
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.students.some((student) => student.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate the number of pages based on filtered data
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * classesPerPage;
  const endIndex = startIndex + classesPerPage;

  // Slice the filtered class data to get only the current page's classes
  const currentClasses = filteredClasses.slice(startIndex, endIndex);


  // Form fields for class details
  const classFields = [
    { name: 'className', label: 'Select Class', type: 'select', options: classes.map(cls => cls.className) },
    { name: 'year', label: 'Select Year', type: 'select', options: Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i) },
    { name: 'teacher', label: 'Teacher Name', type: 'text' },
    { name: 'fees', label: 'Student Fees', type: 'number' },
    { name: 'students', label: 'Student List (Comma Separated)', type: 'text' }
  ];

  const handleFormSubmit = (data) => {
    setClasses([data, ...classes]);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const sortData = (key, direction) => {
    let sortedClasses = [...classes];
    if (key === 'className') {
      sortedClasses.sort((a, b) => {
        const numA = parseInt(a[key].split(' ')[1], 10);
        const numB = parseInt(b[key].split(' ')[1], 10);
        return direction === 'asc' ? numA - numB : numB - numA;
      });
    }
    setClasses(sortedClasses);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Class Management" goBackBtn={true} handleGoBack={handleGoBack} />
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-none lg:w-1/4 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Build Class Profile</h2>
          <Form model="class" fields={classFields} onSubmit={handleFormSubmit} />
        </div>
        <div className="flex-grow bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Class Data</h2>
          <InputField
            label="Search by class name"
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table
            columns={['className', 'year', 'teacher', 'fees', 'students']}
            data={currentClasses}
            onDelete={handleDelete}
            sortData={sortData}
          />
          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>  
  );
};

export default ClassManagement;
