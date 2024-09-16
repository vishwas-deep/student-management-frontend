import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BASE_URL } from '../../BASE_URL';

const TeacherDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}api/teachers`)
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!teachers.length) return <div className="text-center mt-20">Loading...</div>;

    // Extract data for charts
    const genderData = [
        { name: 'Male', value: teachers.filter(teacher => teacher.gender === 'Male').length },
        { name: 'Female', value: teachers.filter(teacher => teacher.gender === 'Female').length }
    ];

    const classData = teachers.reduce((acc, teacher) => {
        teacher.assignedClasses.forEach(className => {
            if (acc[className]) {
                acc[className]++;
            } else {
                acc[className] = 1;
            }
        });
        return acc;
    }, {});

    const barChartData = Object.entries(classData).map(([className, count]) => ({
        className,
        count
    }));

    // Display personal details of the first teacher
    const firstTeacher = teachers[0];

    return (
        <div className="p-6 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Details Card */}
                <div className="bg-blue-100 shadow-lg rounded-lg p-6">
                    <h2 className="text-slate-500 text-center text-xl font-semibold mb-4">Personal Details</h2>
                    <div className="space-y-4 p-6">
                        {firstTeacher && (
                            <div className="space-y-4 text-sm text-gray-700">
                                {[ 
                                    { label: 'Name', value: firstTeacher.name },
                                    { label: 'Gender', value: firstTeacher.gender },
                                    { label: 'Date of Birth', value: new Date(firstTeacher.dob).toDateString() },
                                    { label: 'Contact Details', value: firstTeacher.contactDetails },
                                    { label: 'Salary', value: `$${firstTeacher.salary}` },
                                    { label: 'Assigned Classes', value: firstTeacher.assignedClasses.join(', ') || 'None' }
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between">
                                        <span className="font-bold">{label}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Pie Chart Card */}
                <div className="bg-green-100 shadow-lg rounded-lg p-6 flex items-center justify-center">
                    <div className="w-full h-64"> {/* Adjusted height to match StudentDashboard */}
                        <h2 className="text-slate-500 text-center text-xl font-semibold mb-4">Gender Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
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
                    <div className="w-full h-64"> {/* Adjusted height to match StudentDashboard */}
                        <h2 className="text-slate-500 text-center text-xl font-semibold mb-4">Teacher Count by Class</h2>
                        <ResponsiveContainer width="100%" height="100%">
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

export default TeacherDashboard;
