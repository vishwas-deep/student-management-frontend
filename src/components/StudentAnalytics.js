import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from './common/Header';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../BASE_URL';

const StudentAnalyticsCard = () => {
    const [chartData, setChartData] = useState([]);
    const navigate = useNavigate();

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}api/classes/analytics`);
                const data = await response.json();

                // Transform the data for the chart
                const transformedData = data.map(item => ({
                    class: item.class,    // Use 'class' as 'className' for the chart
                    Male: item.maleCount,     // Set male count
                    Female: item.femaleCount  // Set female count
                }));

                setChartData(transformedData);
            } catch (error) {
                console.error('Error fetching student analytics data:', error);
            }
        };

        fetchData();
    }, []);

    const handleGoBack = () => navigate(-1);  

    return (
        <div className='w-full h-full'>
            <Header
                title={'Student Analytics'}
                goBackBtn={true} 
                handleGoBack={handleGoBack}
            />
            <div className="h-[calc(100vh-100px)] flex justify-center items-center bg-gray-100 overflow-hidden">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full max-w-3xl">
                    <p className="text-gray-500 mb-6">View the number of male and female students in each class.</p>

                    <ResponsiveContainer width={"100%"} height={400}>
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                            <XAxis 
                                dataKey="class" 
                                label={{ value: 'Classes', position: 'insideBottom', offset: -50 }} 
                                angle={-45} // Rotates the class names for better visibility
                                textAnchor="end" 
                                interval={0} // Ensures all class names are shown
                            />
                            <YAxis label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend verticalAlign="top"/>
                            <Bar dataKey="Male" fill="#90CAF9" barSize={30} />
                            <Bar dataKey="Female" fill="#F48FB1" barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StudentAnalyticsCard;
