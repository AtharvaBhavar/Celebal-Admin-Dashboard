import React, { useState } from 'react';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

import ChartCard from './cards/ChartCard';
import BarChart from './cards/BarChart';
import LineChart from './cards/LineChart';
import PieChartComponent from './cards/PieChartComponent';

const Charts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const salesData = [
    { label: 'Jan', value: 45, color: 'bg-blue-500' },
    { label: 'Feb', value: 52, color: 'bg-blue-500' },
    { label: 'Mar', value: 38, color: 'bg-blue-500' },
    { label: 'Apr', value: 61, color: 'bg-blue-500' },
    { label: 'May', value: 55, color: 'bg-blue-500' },
    { label: 'Jun', value: 67, color: 'bg-blue-500' },
  ];

  const revenueData = [12, 19, 15, 27, 22, 34, 28, 41, 35, 48, 42, 55];

  const trafficSources = [
    { label: 'Organic Search', value: 45, color: 'bg-emerald-500' },
    { label: 'Direct', value: 25, color: 'bg-blue-500' },
    { label: 'Social Media', value: 20, color: 'bg-purple-500' },
    { label: 'Email', value: 10, color: 'bg-orange-500' },
  ];

  const deviceStats = [
    { label: 'Desktop', value: 65, color: 'bg-indigo-500' },
    { label: 'Mobile', value: 30, color: 'bg-pink-500' },
    { label: 'Tablet', value: 5, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Sales" icon={<BarChart3 className="text-primary" size={20} />}>
          <BarChart data={salesData} />
        </ChartCard>

        <ChartCard title="Revenue Trend" icon={<TrendingUp className="text-primary" size={20} />}>
          <LineChart data={revenueData} color="bg-emerald-500" />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Traffic Sources" icon={<PieChart className="text-primary" size={20} />}>
          <PieChartComponent data={trafficSources} />
        </ChartCard>

        <ChartCard title="Device Usage" icon={<Activity className="text-primary" size={20} />}>
          <PieChartComponent data={deviceStats} />
        </ChartCard>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Page Views', value: '2.4M', change: '+12%', color: 'bg-blue-500' },
            { label: 'Unique Visitors', value: '1.2M', change: '+8%', color: 'bg-emerald-500' },
            { label: 'Bounce Rate', value: '24%', change: '-3%', color: 'bg-red-500' },
          ].map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${metric.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{metric.value}</span>
              </div>
              <p className="text-gray-800 dark:text-white font-medium">{metric.label}</p>
              <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change} from last month
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
