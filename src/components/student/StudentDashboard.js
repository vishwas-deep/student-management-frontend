import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
        <div className="p-6 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Details Card */}
                <div className="bg-blue-100 shadow-lg rounded-lg p-6">
                    <h2 className="text-slate-500 text-center text-xl font-semibold mb-4">Personal Details</h2>
                    <div className="space-y-4 p-6">
                        {firstStudent && (
                            <div className="space-y-4 text-sm text-gray-700">
                                {[ 
                                    { label: 'Name', value: firstStudent.name },
                                    { label: 'Gender', value: firstStudent.gender },
                                    { label: 'Date of Birth', value: new Date(firstStudent.dob).toDateString() },
                                    { label: 'Contact Details', value: firstStudent.contactDetails },
                                    { label: 'Class', value: firstStudent.class },
                                    { label: 'Fees Paid', value: firstStudent.feesPaid }
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between">
                                        <span className="font-bold">{label}</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Pie Chart Card */}
                <div className="bg-green-100 shadow-lg rounded-lg p-6 flex items-center justify-center">
                    <div className="w-full h-64"> {/* Adjusted height */}
                        <h2 className="text-slate-500 text-center text-xl font-semibold mb-4">Gender Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%"> {/* Ensure it uses full height */}
                            <PieChart>
                                <Pie data={genderData} dataKey="value" nameKey="name" outerRadius="80%" fill="#8884d8" label>
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart Card */}
                <div className="bg-blue-100 shadow-lg rounded-lg p-6 flex items-center justify-center">
                    <div className="w-full h-64"> {/* Adjusted height */}
                        <h2 className="text-slate-500 text-center text-xl font-semibold mb-4">Student Count by Class</h2>
                        <ResponsiveContainer width="100%" height="100%"> {/* Ensure it uses full height */}
                            <BarChart data={barChartData}>
                                <XAxis dataKey="className" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
