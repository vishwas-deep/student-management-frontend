import React, { useEffect, useState } from 'react';
import Form from '../common/Form';
import Table from '../common/Table';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import InputField from '../common/InputField';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const teachersPerPage = 5;

  useEffect(() => {
    // Fetch data from the server and set loading status
    axios.get(`${BASE_URL}api/teachers`)
      .then(response => {
        setTeachers(response.data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(teachers.length / teachersPerPage);
  
  // Filter teachers based on the search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * teachersPerPage;
  const endIndex = startIndex + teachersPerPage;

  // Slice the teacher data to get only the current page's teachers
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  // Form fields for teacher details
  const teacherFields = [
    { name: 'name', label: 'Teacher Name', type: 'text' },
    { name: 'gender', label: 'Select Gender', type: 'select', options: ['Male', 'Female'] },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'contactDetails', label: 'Contact Details', type: 'text' },
    { name: 'salary', label: 'Salary', type: 'number' },
  ];

  const handleFormSubmit = (data) => {
    axios.post(`${BASE_URL}api/teachers`, data)
      .then(response => {
        setTeachers([response.data, ...teachers]);
      })
      .catch(error => {
        console.error('Error adding teacher:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}api/teachers/${id}`)
      .then(() => {
        setTeachers(teachers.filter(teacher => teacher._id !== id));
      })
      .catch(error => {
        console.error('Error deleting teacher:', error);
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
    let sortedTeachers = [...teachers];
    if (key === 'name') {
      sortedTeachers.sort((a, b) => {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      });
    }
    setTeachers(sortedTeachers);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Teacher Management" goBackBtn={true} handleGoBack={handleGoBack} />
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-none lg:w-1/4 bg-white shadow-md rounded-lg p-6">
          <h5 className="font-bold mb-4 text-slate-600">Build Teacher's Profile</h5>
          <Form model="teacher" fields={teacherFields} onSubmit={handleFormSubmit} />
        </div>
        <div className="flex-grow bg-white shadow-md rounded-lg p-6">
          <h5 className="text-slate-600 font-bold mb-4">Teacher's Data</h5>

          <InputField
            label="Search by teacher's name"
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

              <Table
                columns={['name', 'gender', 'dob', 'contactDetails', 'salary']}
                data={currentTeachers}
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

export default TeacherManagement;
