import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from './common/Header';
import { useNavigate } from 'react-router-dom';

const StudentAnalyticsCard = () => {
    // Sample student data
    const students = [
        // Add your student data here
        { name: 'John Doe', gender: 'Male', dob: '2005-05-15', contactDetails: '1234567890', feesPaid: 1000, class: 'Class 1' },
        { name: 'Alice Smith', gender: 'Female', dob: '2006-08-22', contactDetails: '0987654321', feesPaid: 1000, class: 'Class 1' },
        { name: 'Bob Brown', gender: 'Male', dob: '2004-11-30', contactDetails: '1234567890', feesPaid: 1000, class: 'Class 1' },
        { name: 'Steve Johnson', gender: 'Male', dob: '2006-02-05', contactDetails: '7894561230', feesPaid: 1500, class: 'Class 2' },
        { name: 'Mark White', gender: 'Male', dob: '2006-12-22', contactDetails: '7418529630', feesPaid: 1500, class: 'Class 2' },
        { name: 'Sarah Brown', gender: 'Female', dob: '2005-06-15', contactDetails: '9632587410', feesPaid: 1500, class: 'Class 2' },
        { name: 'Emily Green', gender: 'Female', dob: '2005-08-01', contactDetails: '8529637410', feesPaid: 1200, class: 'Class 3' },
        { name: 'Daniel Blue', gender: 'Male', dob: '2004-04-04', contactDetails: '4563217890', feesPaid: 1200, class: 'Class 3' },
        { name: 'Sophia Black', gender: 'Female', dob: '2005-12-12', contactDetails: '9517532584', feesPaid: 1200, class: 'Class 3' },
        { name: 'Jacob White', gender: 'Male', dob: '2004-01-20', contactDetails: '3216549870', feesPaid: 1300, class: 'Class 4' },
        { name: 'Olivia Martin', gender: 'Female', dob: '2006-07-17', contactDetails: '1237894560', feesPaid: 1300, class: 'Class 4' },
        { name: 'Ethan Brown', gender: 'Male', dob: '2005-10-25', contactDetails: '9871236540', feesPaid: 1300, class: 'Class 4' },
        { name: 'Ava Davis', gender: 'Female', dob: '2006-03-10', contactDetails: '7418529630', feesPaid: 1400, class: 'Class 5' },
        { name: 'William Lee', gender: 'Male', dob: '2005-09-15', contactDetails: '8521479630', feesPaid: 1400, class: 'Class 5' },
        { name: 'Isabella Wilson', gender: 'Female', dob: '2006-06-25', contactDetails: '9638527410', feesPaid: 1400, class: 'Class 5' },
        { name: 'James Anderson', gender: 'Male', dob: '2005-02-05', contactDetails: '9513572580', feesPaid: 1500, class: 'Class 6' },
        { name: 'Mia Thompson', gender: 'Female', dob: '2006-11-12', contactDetails: '8529637410', feesPaid: 1500, class: 'Class 6' },
        { name: 'Benjamin Lee', gender: 'Male', dob: '2004-04-16', contactDetails: '7412589630', feesPaid: 1500, class: 'Class 6' },
        { name: 'Charlotte Martinez', gender: 'Female', dob: '2005-07-09', contactDetails: '1236549870', feesPaid: 1600, class: 'Class 7' },
        { name: 'Liam Scott', gender: 'Male', dob: '2006-08-19', contactDetails: '9637418520', feesPaid: 1600, class: 'Class 7' },
        { name: 'Ella Harris', gender: 'Female', dob: '2004-12-01', contactDetails: '8527419630', feesPaid: 1600, class: 'Class 7' },
        { name: 'Lucas Clark', gender: 'Male', dob: '2005-05-12', contactDetails: '9517534896', feesPaid: 1700, class: 'Class 8' },
        { name: 'Amelia Allen', gender: 'Female', dob: '2006-09-23', contactDetails: '1234567890', feesPaid: 1700, class: 'Class 8' },
        { name: 'Oliver Young', gender: 'Male', dob: '2004-11-30', contactDetails: '9876543210', feesPaid: 1700, class: 'Class 8' },
        { name: 'Harper King', gender: 'Female', dob: '2005-02-20', contactDetails: '7418529630', feesPaid: 1800, class: 'Class 9' },
        { name: 'Elijah Adams', gender: 'Male', dob: '2006-03-15', contactDetails: '9638527410', feesPaid: 1800, class: 'Class 9' },
        { name: 'Grace Walker', gender: 'Female', dob: '2004-10-10', contactDetails: '8527419630', feesPaid: 1800, class: 'Class 9' },
        { name: 'Henry Carter', gender: 'Male', dob: '2005-06-20', contactDetails: '1234567890', feesPaid: 1900, class: 'Class 10' },
        { name: 'Sophie Nelson', gender: 'Female', dob: '2006-07-25', contactDetails: '9876543210', feesPaid: 1900, class: 'Class 10' },
        { name: 'Mason Perry', gender: 'Male', dob: '2004-12-05', contactDetails: '7418529630', feesPaid: 1900, class: 'Class 10' },
        { name: 'Aiden Murphy', gender: 'Male', dob: '2005-01-15', contactDetails: '9638527410', feesPaid: 2000, class: 'Class 11' },
        { name: 'Lily Rivera', gender: 'Female', dob: '2006-05-10', contactDetails: '8521479630', feesPaid: 2000, class: 'Class 11' },
        { name: 'Jackson Wood', gender: 'Male', dob: '2004-09-20', contactDetails: '1597534862', feesPaid: 2000, class: 'Class 11' },
        { name: 'Chloe Collins', gender: 'Female', dob: '2005-02-14', contactDetails: '9513578520', feesPaid: 2100, class: 'Class 12' },
        { name: 'Noah Murphy', gender: 'Male', dob: '2006-10-22', contactDetails: '7412589630', feesPaid: 2100, class: 'Class 12' },
        { name: 'Ethan Young', gender: 'Male', dob: '2004-11-11', contactDetails: '8529637410', feesPaid: 2100, class: 'Class 12' }
    ];

    // Function to calculate the number of male and female students per class
    const getClassGenderCounts = (students) => {
        const genderCounts = {};

        students.forEach(({ class: studentClass, gender }) => {
            if (!genderCounts[studentClass]) {
                genderCounts[studentClass] = { Male: 0, Female: 0 };
            }
            genderCounts[studentClass][gender]++;
        });

        return genderCounts;
    };

    const genderCounts = getClassGenderCounts(students);

    // Transform the data for the bar chart
    const chartData = Object.keys(genderCounts).map(className => ({
        className,
        Male: genderCounts[className].Male,
        Female: genderCounts[className].Female
    }));

    const navigate = useNavigate();
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
                                dataKey="className" 
                                label={{ value: 'Classes', position: 'insideBottom', offset: -50 }} 
                                angle={-45} // Rotates the class names for better visibility
                                textAnchor="end" 
                                interval={0} // Ensures all class names are shown
                            />
                            <YAxis label={{ value: 'Number of Students', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
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
