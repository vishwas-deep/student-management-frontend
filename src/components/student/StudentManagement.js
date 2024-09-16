import React, { useEffect, useState } from 'react';
import Form from '../common/Form';
import Table from '../common/Table';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import InputField from '../common/InputField';
import axios from 'axios';

const StudentManagement = () => {
  // Dummy student data
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    // Fetch student data from the backend
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students');
        const data = await response.json();
        setStudents(data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false)
      }
    };

    axios.get('http://localhost:5000/api/classes')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });


    fetchStudents();
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Get the current page's students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  // const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Filter students based on search query
  const filteredStudents = students?.filter(student =>
    student?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  // Get the current page's filtered students
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Form fields for student details
  const studentFields = [
    { name: 'name', label: 'Student Name', type: 'text' },
    { name: 'gender', label: 'Select Gender', type: 'select', options: ['Male', 'Female'] },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'contactDetails', label: 'Contact Details', type: 'text' },
    { name: 'feesPaid', label: 'Fees Paid', type: 'number' },
    { name: 'class', label: 'Select Class', type: 'select', options: classes.map(_class => _class.className) },
  ];
  const handleFormSubmit = async (data) => {
    // Convert class to className
    const transformedData = {
      ...data,
      className: data?.class, // Map class to className
    };

    // Remove the original class key
    delete transformedData.class;

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData), // Send transformed data
      });
      const newStudent = await response.json();
      setStudents([newStudent, ...students]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE',
      });
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };


  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

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
    let sortedStudents = [...students];
    if (key === 'name') {
      sortedStudents.sort((a, b) => {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      });
    }
    setStudents(sortedStudents);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Student Management" goBackBtn={true} handleGoBack={handleGoBack} />
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-none lg:w-1/4 bg-white shadow-md rounded-lg p-6">
          <h5 className="font-bold mb-4 text-slate-600">Build Student's Profile</h5>
          <Form model="student" fields={studentFields} onSubmit={handleFormSubmit} />
        </div>
        <div className="flex-grow bg-white shadow-md rounded-lg p-6">
          <h5 className="text-slate-600 font-bold mb-4">Student's Data</h5>
          <InputField
            label="Search by student name"
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table
            columns={['name', 'gender', 'dob', 'contactDetails', 'feesPaid', 'class']}
            data={currentStudents}
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

export default StudentManagement;
