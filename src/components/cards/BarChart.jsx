import React from 'react';

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-16 text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`}
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          <div className="w-12 text-sm font-medium text-gray-800 dark:text-white text-right">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
