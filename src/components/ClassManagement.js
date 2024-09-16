import React, { useEffect, useState } from 'react';
import Form from './common/Form';
import Table from './common/Table';
import { useNavigate } from 'react-router-dom';
import Header from './common/Header';
import InputField from './common/InputField';
import axios from 'axios';

const ClassManagement = () => {
  // Dummy class data
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]); // New state for teachers
  const [loading, setLoading] = useState(true); // Loading state

  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 5;

  useEffect(() => {
    // Fetch data from the server
    axios.get('http://localhost:5000/api/classes')
      .then(response => {
        setClasses(response.data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Data fetched, stop loading
      });

    // Fetch teacher data from the server
    axios.get('http://localhost:5000/api/teachers')
      .then(response => {
        setTeachers(response.data); // Set the fetched teacher data
      })
      .catch(error => {
        console.error('Error fetching teacher data:', error);
      });
  }, []);

  // Filter classes based on the search query
  const filteredClasses = classes.filter((cls) =>
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cls.className.toLowerCase().includes(searchQuery.toLowerCase())
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
    { name: 'className', label: 'Select Class', type: 'select', options: Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`) },
    { name: 'year', label: 'Select Year', type: 'select', options: Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i) },
    { name: 'teacher', label: 'Assigned Teacher', type: 'select', options: teachers.map(teacher => teacher.name) },
    { name: 'studentFees', label: 'Student Fees', type: 'number' },
  ];

  const handleFormSubmit = (data) => {
    axios.post('http://localhost:5000/api/classes', data)
      .then(response => {
        setClasses([response.data, ...classes]);
      })
      .catch(error => {
        console.error('Error adding class:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/classes/${id}`)
      .then(() => {
        setClasses(classes.filter(cls => cls._id !== id));
      })
      .catch(error => {
        console.error('Error deleting class:', error);
      });
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
          <h5 className="font-bold mb-4 text-slate-600">Build Class Profile</h5>
          <Form model="class" fields={classFields} onSubmit={handleFormSubmit} />
        </div>
        <div className="flex-grow bg-white shadow-md rounded-lg p-6">
          <h5 className="text-slate-600 font-bold mb-4">Class Data</h5>
          <InputField
            label="Search by class name or teacher's name"
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table
            columns={['className', 'year', 'teacher', 'studentFees']}
            data={currentClasses}
            onDelete={handleDelete}
            sortData={sortData}
            loading={loading}
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
