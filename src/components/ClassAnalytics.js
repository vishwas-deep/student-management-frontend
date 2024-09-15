// ClassAnalytics.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const ClassAnalytics = ({ classData }) => {
  const maleCount = classData.students.filter(student => student.gender === 'male').length;
  const femaleCount = classData.students.filter(student => student.gender === 'female').length;

  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Student Count',
        data: [maleCount, femaleCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h1>Class Analytics</h1>
      <p>Class Name: {classData.className}</p>
      <p>Year: {classData.year}</p>
      <p>Teacher: {classData.teacher}</p>
      <Bar data={data} />
    </div>
  );
};

export default ClassAnalytics;
