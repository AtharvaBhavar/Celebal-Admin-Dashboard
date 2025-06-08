import React from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
      </div>
      <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
        {icon}
      </div>
    </div>
    <div className="flex items-center mt-4 space-x-2">
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className="text-sm font-medium">{change}</span>
      </div>
      <span className="text-gray-500 dark:text-gray-400 text-sm">vs last month</span>
    </div>
  </div>
);

const MiniChart = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  return (
    <div className="flex items-end space-x-1 h-16">
      {data.map((value, index) => {
        const height = range === 0 ? 50 : ((value - min) / range) * 100;
        return (
          <div
            key={index}
            className={`${color} rounded-t-sm transition-all duration-300 hover:opacity-80`}
            style={{ height: `${Math.max(height, 5)}%`, width: '8px' }}
          />
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSign className="text-primary\" size={24} />,
    },
    {
      title: 'Active Users',
      value: '2,341',
      change: '+8.2%',
      isPositive: true,
      icon: <Users className="text-primary\" size={24} />,
    },
    {
      title: 'Orders',
      value: '1,423',
      change: '-2.4%',
      isPositive: false,
      icon: <ShoppingCart className="text-primary\" size={24} />,
    },
    {
      title: 'Growth Rate',
      value: '18.6%',
      change: '+4.1%',
      isPositive: true,
      icon: <TrendingUp className="text-primary\" size={24} />,
    },
  ];

  const chartData = [
    { name: 'Sales Overview', data: [12, 19, 15, 27, 22, 34, 28, 41, 35, 48, 42, 55] },
    { name: 'User Activity', data: [8, 15, 12, 28, 19, 31, 25, 38, 32, 45, 39, 52] },
    { name: 'Revenue Trend', data: [15, 22, 18, 35, 28, 42, 38, 51, 45, 58, 52, 65] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Analytics</h3>
          <div className="space-y-4">
            {chartData.map((chart, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{chart.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last 12 months</p>
                </div>
                <MiniChart 
                  data={chart.data} 
                  color={index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-emerald-500' : 'bg-purple-500'} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { user: 'Sarah Johnson', action: 'completed a purchase', time: '2 minutes ago', avatar: 'SJ' },
              { user: 'Mike Chen', action: 'updated profile', time: '5 minutes ago', avatar: 'MC' },
              { user: 'Emily Davis', action: 'left a review', time: '10 minutes ago', avatar: 'ED' },
              { user: 'Alex Thompson', action: 'joined the platform', time: '15 minutes ago', avatar: 'AT' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;