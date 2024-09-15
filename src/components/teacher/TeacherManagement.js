import React, { useState } from 'react';
import Form from '../common/Form';
import Table from '../common/Table';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import InputField from '../common/InputField';

const TeacherManagement = () => {
  // Dummy teacher data
  const [teachers, setTeachers] = useState([
    {
      teacherName: 'Mr. Smith',
      gender: 'Male',
      dob: '1980-05-15',
      contact: '9876543210',
      salary: 50000,
      assignedClass: 'Class 1',
    },
    {
      teacherName: 'Ms. Johnson',
      gender: 'Female',
      dob: '1985-09-20',
      contact: '8765432109',
      salary: 55000,
      assignedClass: 'Class 2',
    },
    {
      teacherName: 'Mrs. Brown',
      gender: 'Female',
      dob: '1975-12-12',
      contact: '7654321098',
      salary: 60000,
      assignedClass: 'Class 3',
    },
    {
      teacherName: 'Mr. White',
      gender: 'Male',
      dob: '1970-11-11',
      contact: '1231231234',
      salary: 55000,
      assignedClass: 'Class 4',
    },
    {
      teacherName: 'Ms. Davis',
      gender: 'Female',
      dob: '1980-03-22',
      contact: '4567891230',
      salary: 58000,
      assignedClass: 'Class 5',
    },
    {
      teacherName: 'Mr. Wilson',
      gender: 'Male',
      dob: '1978-07-25',
      contact: '7891234560',
      salary: 60000,
      assignedClass: 'Class 6',
    },
    {
      teacherName: 'Mrs. Martinez',
      gender: 'Female',
      dob: '1982-09-19',
      contact: '6543219870',
      salary: 61000,
      assignedClass: 'Class 7',
    },
    {
      teacherName: 'Mr. Anderson',
      gender: 'Male',
      dob: '1973-01-10',
      contact: '9513578520',
      salary: 62000,
      assignedClass: 'Class 8',
    },
    {
      teacherName: 'Ms. Thompson',
      gender: 'Female',
      dob: '1981-02-14',
      contact: '7412589630',
      salary: 63000,
      assignedClass: 'Class 9',
    },
    {
      teacherName: 'Mr. Johnson',
      gender: 'Male',
      dob: '1984-06-10',
      contact: '9638527410',
      salary: 64000,
      assignedClass: 'Class 10',
    },
    {
      teacherName: 'Mrs. Clark',
      gender: 'Female',
      dob: '1979-04-04',
      contact: '8521479630',
      salary: 65000,
      assignedClass: 'Class 11',
    },
    {
      teacherName: 'Mr. Scott',
      gender: 'Male',
      dob: '1976-08-08',
      contact: '1597534862',
      salary: 66000,
      assignedClass: 'Class 12',
    }
  ]);

  const [searchQuery, setSearchQuery] = useState(''); // New search query state

  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 5;

  // Calculate the number of pages
  const totalPages = Math.ceil(teachers.length / teachersPerPage);
  // Filter teachers based on the search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * teachersPerPage;
  const endIndex = startIndex + teachersPerPage;

  // Slice the teacher data to get only the current page's teachers
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  // Form fields for teacher details
  const teacherFields = [
    { name: 'teacherName', label: 'Teacher Name', type: 'text' },
    { name: 'gender', label: 'Select Gender', type: 'select', options: ['Male', 'Female'] },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'contact', label: 'Contact Details', type: 'text' },
    { name: 'salary', label: 'Salary', type: 'number' },
    { name: 'assignedClass', label: 'Assigned Class', type: 'select', options: Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`) },
  ];

  const handleFormSubmit = (data) => {
    setTeachers([data, ...teachers]);
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
    setTeachers(teachers.filter((_, i) => i !== index));
  };

  const sortData = (key, direction) => {
    let sortedTeachers = [...teachers];
    if (key === 'teacherName') {
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
          {/* Heading for the form */}
          <h2 className="text-2xl font-bold mb-4">Build Teacher's Profile</h2>
          <Form model="teacher" fields={teacherFields} onSubmit={handleFormSubmit} />
        </div>
        <div className="flex-grow bg-white shadow-md rounded-lg p-6">
          {/* Heading for the table */}
          <h2 className="text-2xl font-bold mb-4">Teacher's Data</h2>
          {/* Search Input */}
          <InputField
            label="Search by teacher's name"
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Table
            columns={['teacherName', 'gender', 'dob', 'contact', 'salary', 'assignedClass']}
            data={currentTeachers}
            onDelete={handleDelete}
            sortData={sortData}
          />

          {/* Pagination */}
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
