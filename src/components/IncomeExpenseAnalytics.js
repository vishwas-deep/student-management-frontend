import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Header from './common/Header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { incomeExpenseData } from './IncomeExpenseData.js';

const IncomeExpenseAnalytics = () => {
  const [view, setView] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState('2023-01');
  const [selectedYear, setSelectedYear] = useState('2023');

  const handleViewChange = (e) => setView(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const getMonthlyData = (month) => {
    const expenseData = incomeExpenseData.expenses.find((e) => e.month === month);
    const incomeData = incomeExpenseData.income.find((i) => i.month === month);
    return { expenseData, incomeData };
  };

  const getYearlyData = (year) => {
    const totalSalaries = incomeExpenseData.expenses
      .filter((e) => e.month.startsWith(year))
      .reduce((acc, cur) => acc + cur.totalSalaries, 0);

    const totalFees = incomeExpenseData.income
      .filter((i) => i.month.startsWith(year))
      .reduce((acc, cur) => acc + cur.totalFees, 0);

    return { totalSalaries, totalFees };
  };

  const data = view === 'monthly' ? getMonthlyData(selectedMonth) : getYearlyData(selectedYear);

  const pieData = {
    labels: ['Total Salaries', 'Total Fees'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [
          view === 'monthly'
            ? (data.expenseData?.totalSalaries || 0)
            : (data.totalSalaries || 0),
          view === 'monthly'
            ? (data.incomeData?.totalFees || 0)
            : (data.totalFees || 0)
        ],
        backgroundColor: ['#f87171', '#34d399'],
        hoverBackgroundColor: ['#f87171', '#34d399'],
      },
    ],
  };


  const barData = {
    labels: ['Total Salaries', 'Total Fees'],
    datasets: [
      {
        label: 'Yearly Income vs Expenses',
        data: [data.totalSalaries || 0, data.totalFees || 0],
        backgroundColor: ['#f87171', '#34d399'],
      },
    ],
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Income and Expense Analytics', 20, 10);

    const tableData = view === 'monthly'
      ? [
        ['Month', selectedMonth],
        ['Total Salaries', `$${data.expenseData?.totalSalaries || 0}`],
        ['Total Fees', `$${data.incomeData?.totalFees || 0}`],
      ]
      : [
        ['Year', selectedYear],
        ['Total Salaries', `$${data.totalSalaries || 0}`],
        ['Total Fees', `$${data.totalFees || 0}`],
      ];

    doc.autoTable({
      head: [['Field', 'Value']],
      body: tableData,
    });

    doc.save('IncomeExpenseAnalytics.pdf');
  };

  const downloadData = () => {
    const jsonData = view === 'monthly'
      ? {
        month: selectedMonth,
        totalSalaries: data.expenseData?.totalSalaries || 0,
        totalFees: data.incomeData?.totalFees || 0,
      }
      : {
        year: selectedYear,
        totalSalaries: data.totalSalaries || 0,
        totalFees: data.totalFees || 0,
      };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'IncomeExpenseData.json';
    link.click();
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={'Income & Expense Analytics'}
        goBackBtn={true}
        handleGoBack={handleGoBack}
      />

      <div className='p-6'>
        <div className="flex justify-center space-x-6 mb-6">
          <label className="block">
            <span className="text-gray-700 font-semibold">View</span>
            <select
              value={view}
              onChange={handleViewChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>

          {view === 'monthly' ? (
            <label className="block">
              <span className="text-gray-700 font-semibold">Month</span>
              <input
                autoComplete="off"
                type="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </label>
          )
            :
            <label className="block">
              <span className="text-gray-700 font-semibold">Year</span>
              <input
                autoComplete="off"
                type="number"
                value={selectedYear}
                onChange={handleYearChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
              />
            </label>}


        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 max-w-4xl mx-auto">
          {view === 'monthly' && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Month: {selectedMonth}</h2>
              <p className="text-gray-700">Total Salaries: ${data.expenseData?.totalSalaries || 0}</p>
              <p className="text-gray-700">Total Fees: ${data.incomeData?.totalFees || 0}</p>
            </div>
          )}

          {view === 'yearly' && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Year: {selectedYear}</h2>
              <p className="text-gray-700">Total Salaries: ${data.totalSalaries || 0}</p>
              <p className="text-gray-700">Total Fees: ${data.totalFees || 0}</p>
            </div>
          )}

          {/* Chart Rendering */}
          <div className="mt-8 flex justify-center">
            {view === 'monthly' ? (
              <div className="w-62 h-62">
                {pieData.datasets[0].data.length > 0 && (
                  <Pie data={pieData} />
                )}              </div>
            ) : (
              <div className="w-62 h-62">
                <Bar data={barData} />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={exportToPDF}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
          >
            Export as PDF
          </button>
          <button
            onClick={downloadData}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Download Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseAnalytics;
