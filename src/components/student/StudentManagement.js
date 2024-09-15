import React, { useState } from 'react';
import Form from '../common/Form';
import Table from '../common/Table';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import InputField from '../common/InputField';

const StudentManagement = () => {
  // Dummy student data
  const [students, setStudents] = useState([
    // Class 1
    { studentName: 'John Doe', gender: 'Male', dob: '2005-05-15', contact: '1234567890', feesPaid: 1000, class: 'Class 1' },
    { studentName: 'Alice Smith', gender: 'Female', dob: '2006-08-22', contact: '0987654321', feesPaid: 1000, class: 'Class 1' },
    { studentName: 'Bob Brown', gender: 'Male', dob: '2004-11-30', contact: '1234567890', feesPaid: 1000, class: 'Class 1' },
    // Class 2
    { studentName: 'Steve Johnson', gender: 'Male', dob: '2006-02-05', contact: '7894561230', feesPaid: 1500, class: 'Class 2' },
    { studentName: 'Mark White', gender: 'Male', dob: '2006-12-22', contact: '7418529630', feesPaid: 1500, class: 'Class 2' },
    { studentName: 'Sarah Brown', gender: 'Female', dob: '2005-06-15', contact: '9632587410', feesPaid: 1500, class: 'Class 2' },
    // Class 3
    { studentName: 'Emily Green', gender: 'Female', dob: '2005-08-01', contact: '8529637410', feesPaid: 1200, class: 'Class 3' },
    { studentName: 'Daniel Blue', gender: 'Male', dob: '2004-04-04', contact: '4563217890', feesPaid: 1200, class: 'Class 3' },
    { studentName: 'Sophia Black', gender: 'Female', dob: '2005-12-12', contact: '9517532584', feesPaid: 1200, class: 'Class 3' },
    // Class 4
    { studentName: 'Jacob White', gender: 'Male', dob: '2004-01-20', contact: '3216549870', feesPaid: 1300, class: 'Class 4' },
    { studentName: 'Olivia Martin', gender: 'Female', dob: '2006-07-17', contact: '1237894560', feesPaid: 1300, class: 'Class 4' },
    { studentName: 'Ethan Brown', gender: 'Male', dob: '2005-10-25', contact: '9871236540', feesPaid: 1300, class: 'Class 4' },
    // Class 5
    { studentName: 'Ava Davis', gender: 'Female', dob: '2006-03-10', contact: '7418529630', feesPaid: 1400, class: 'Class 5' },
    { studentName: 'William Lee', gender: 'Male', dob: '2005-09-15', contact: '8521479630', feesPaid: 1400, class: 'Class 5' },
    { studentName: 'Isabella Wilson', gender: 'Female', dob: '2006-06-25', contact: '9638527410', feesPaid: 1400, class: 'Class 5' },
    // Class 6
    { studentName: 'James Anderson', gender: 'Male', dob: '2005-02-05', contact: '9513572580', feesPaid: 1500, class: 'Class 6' },
    { studentName: 'Mia Thompson', gender: 'Female', dob: '2006-11-12', contact: '8529637410', feesPaid: 1500, class: 'Class 6' },
    { studentName: 'Benjamin Lee', gender: 'Male', dob: '2004-04-16', contact: '7412589630', feesPaid: 1500, class: 'Class 6' },
    // Class 7
    { studentName: 'Charlotte Martinez', gender: 'Female', dob: '2005-07-09', contact: '1236549870', feesPaid: 1600, class: 'Class 7' },
    { studentName: 'Liam Scott', gender: 'Male', dob: '2006-08-19', contact: '9637418520', feesPaid: 1600, class: 'Class 7' },
    { studentName: 'Ella Harris', gender: 'Female', dob: '2004-12-01', contact: '8527419630', feesPaid: 1600, class: 'Class 7' },
    // Class 8
    { studentName: 'Lucas Clark', gender: 'Male', dob: '2005-05-12', contact: '9517534896', feesPaid: 1700, class: 'Class 8' },
    { studentName: 'Amelia Allen', gender: 'Female', dob: '2006-09-23', contact: '1234567890', feesPaid: 1700, class: 'Class 8' },
    { studentName: 'Oliver Young', gender: 'Male', dob: '2004-11-30', contact: '9876543210', feesPaid: 1700, class: 'Class 8' },
    // Class 9
    { studentName: 'Harper King', gender: 'Female', dob: '2005-02-20', contact: '7418529630', feesPaid: 1800, class: 'Class 9' },
    { studentName: 'Elijah Adams', gender: 'Male', dob: '2006-03-15', contact: '9638527410', feesPaid: 1800, class: 'Class 9' },
    { studentName: 'Grace Walker', gender: 'Female', dob: '2004-10-10', contact: '8527419630', feesPaid: 1800, class: 'Class 9' },
    // Class 10
    { studentName: 'Henry Carter', gender: 'Male', dob: '2005-06-20', contact: '1234567890', feesPaid: 1900, class: 'Class 10' },
    { studentName: 'Sophie Nelson', gender: 'Female', dob: '2006-07-25', contact: '9876543210', feesPaid: 1900, class: 'Class 10' },
    { studentName: 'Mason Perry', gender: 'Male', dob: '2004-12-05', contact: '7418529630', feesPaid: 1900, class: 'Class 10' },
    // Class 11
    { studentName: 'Aiden Murphy', gender: 'Male', dob: '2005-01-15', contact: '9638527410', feesPaid: 2000, class: 'Class 11' },
    { studentName: 'Lily Rivera', gender: 'Female', dob: '2006-05-10', contact: '8521479630', feesPaid: 2000, class: 'Class 11' },
    { studentName: 'Jackson Wood', gender: 'Male', dob: '2004-09-20', contact: '1597534862', feesPaid: 2000, class: 'Class 11' },
    // Class 12
    { studentName: 'Chloe Collins', gender: 'Female', dob: '2005-02-14', contact: '9513578520', feesPaid: 2100, class: 'Class 12' },
    { studentName: 'Noah Murphy', gender: 'Male', dob: '2006-10-22', contact: '7412589630', feesPaid: 2100, class: 'Class 12' },
    { studentName: 'Ethan Young', gender: 'Male', dob: '2004-11-11', contact: '8529637410', feesPaid: 2100, class: 'Class 12' }
  ]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Calculate the number of pages
  const totalPages = Math.ceil(students.length / studentsPerPage);

  // Get the current page's students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  // const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the current page's filtered students
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);


  // Form fields for student details
  const studentFields = [
    { name: 'studentName', label: 'Student Name', type: 'text' },
    { name: 'gender', label: 'Select Gender', type: 'select', options: ['Male', 'Female'] },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'contact', label: 'Contact Details', type: 'text' },
    { name: 'feesPaid', label: 'Fees Paid', type: 'number' },
    { name: 'class', label: 'Select Class', type: 'select', options: Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`) },
  ];

  const handleFormSubmit = (data) => {
    setStudents([data, ...students]);
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

  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const sortData = (key, direction) => {
    let sortedStudents = [...students];
    if (key === 'studentName') {
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
          <h2 className="text-2xl font-bold mb-4">Build Student's Profile</h2>
          <Form model="student" fields={studentFields} onSubmit={handleFormSubmit} />
        </div>
        <div className="flex-grow bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Student's Data</h2>
          <InputField
            label="Search by student name"
            type="text"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table
            columns={['studentName', 'gender', 'dob', 'contact', 'feesPaid', 'class']}
            data={currentStudents}
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

export default StudentManagement;
