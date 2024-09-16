import React, { useState } from 'react';
import { FaSortDown, FaSortUp, FaSort } from "react-icons/fa6";

const Table = ({ columns, data, onDelete, sortData, loading }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  return (
    <div style={{ minHeight: '333px' }} className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="border-b bg-gray-100">
            {columns.map((col) => (
              <th
                key={col}
                className={`py-3 px-6 text-left text-gray-700 font-medium tracking-wider cursor-pointer ${sortConfig.key === col ? 'bg-gray-200' : ''}`}
                onClick={() => requestSort(col)}
                title="Click to sort"
              >
                <div className="flex items-center">
                  <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                  {sortConfig.key === col ? (
                    sortConfig.direction === 'asc' ?
                      <FaSortUp className="ml-2" /> :
                      <FaSortDown className="ml-2" />
                  ) : (
                    <FaSort className="ml-2" />
                  )}
                </div>
              </th>
            ))}
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            // Skeleton preloader with 5 rows
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                {columns.map((col, i) => (
                  <td key={i} className="py-5 px-6 text-gray-300 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                ))}
                <td className="py-5 px-6 text-gray-300 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))
          ) : (
            sortedData.map((item, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                {columns.map((col) => (
                  <td key={col} className="py-3 px-6 text-gray-700">
                    {Array.isArray(item[col]) ? item[col].join(', ') : item[col]}
                  </td>
                ))}
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onDelete(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
