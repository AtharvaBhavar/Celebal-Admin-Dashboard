import React from 'react';

const ChartCard = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
    <div className="flex items-center space-x-2 mb-4">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
    </div>
    {children}
  </div>
);

export default ChartCard;
