import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const StudentDashboard = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!students.length) return <div className="text-center mt-20">Loading...</div>;

    // Extract data for charts
    const genderData = [
        { name: 'Male', value: students.filter(student => student.gender === 'Male').length },
        { name: 'Female', value: students.filter(student => student.gender === 'Female').length }
    ];

    const classData = students.reduce((acc, student) => {
        const className = student.class;
        if (acc[className]) {
            acc[className]++;
        } else {
            acc[className] = 1;
        }
        return acc;
    }, {});

    const barChartData = Object.entries(classData).map(([className, count]) => ({
        className,
        count
    }));

    // Display personal details of the first student
    const firstStudent = students[0];

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
                    {firstStudent && (
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {firstStudent.name}</p>
                            <p><strong>Gender:</strong> {firstStudent.gender}</p>
                            <p><strong>Date of Birth:</strong> {new Date(firstStudent.dob).toDateString()}</p>
                            <p><strong>Contact Details:</strong> {firstStudent.contactDetails}</p>
                            <p><strong>Class:</strong> {firstStudent.class}</p>
                            <p><strong>Fees Paid:</strong> {firstStudent.feesPaid}</p>
                        </div>
                    )}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Gender Distribution</h2>
                        <PieChart width={400} height={400}>
                            <Pie data={genderData} dataKey="value" nameKey="name" outerRadius={150} fill="#8884d8" label>
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Student Count by Class</h2>
                        <BarChart width={600} height={300} data={barChartData}>
                            <XAxis dataKey="className" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
