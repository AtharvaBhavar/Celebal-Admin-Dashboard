// import React, { useState } from 'react';
// import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';

// const ChartCard = ({ title, icon, children }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
//     <div className="flex items-center space-x-2 mb-4">
//       {icon}
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
//     </div>
//     {children}
//   </div>
// );

// const BarChart = ({ data }) => {
//   const maxValue = Math.max(...data.map(d => d.value));
  
//   return (
//     <div className="space-y-3">
//       {data.map((item, index) => (
//         <div key={index} className="flex items-center space-x-3">
//           <div className="w-16 text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
//           <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
//             <div
//               className={`h-full rounded-full transition-all duration-1000 ease-out ${item.color}`}
//               style={{ width: `${(item.value / maxValue) * 100}%` }}
//             />
//           </div>
//           <div className="w-12 text-sm font-medium text-gray-800 dark:text-white text-right">{item.value}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const LineChart = ({ data, color }) => {
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const range = max - min;

//   const points = data.map((value, index) => {
//     const x = (index / (data.length - 1)) * 100;
//     const y = range === 0 ? 50 : 100 - ((value - min) / range) * 100;
//     return `${x},${y}`;
//   }).join(' ');

//   return (
//     <div className="h-48 w-full relative">
//       <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//         <defs>
//           <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" className={color.replace('bg-', 'stop-')} stopOpacity="0.3"/>
//             <stop offset="100%" className={color.replace('bg-', 'stop-')} stopOpacity="0"/>
//           </linearGradient>
//         </defs>
//         <polyline
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="0.5"
//           points={points}
//           className={color.replace('bg-', 'text-')}
//         />
//         <polygon
//           fill="url(#gradient)"
//           points={`${points} 100,100 0,100`}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
//         {data.map((value, index) => (
//           <div
//             key={index}
//             className={`w-2 h-2 rounded-full ${color} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
//             title={`Value: ${value}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const PieChartComponent = ({ data }) => {
//   const total = data.reduce((sum, item) => sum + item.value, 0);
//   let cumulativePercentage = 0;

//   return (
//     <div className="flex items-center space-x-6">
//       <div className="relative w-32 h-32">
//         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//           {data.map((item, index) => {
//             const percentage = (item.value / total) * 100;
//             const strokeDasharray = `${percentage} ${100 - percentage}`;
//             const strokeDashoffset = -cumulativePercentage;
//             cumulativePercentage += percentage;

//             return (
//               <circle
//                 key={index}
//                 cx="50"
//                 cy="50"
//                 r="40"
//                 fill="none"
//                 strokeWidth="8"
//                 className={item.color.replace('bg-', 'stroke-')}
//                 strokeDasharray={strokeDasharray}
//                 strokeDashoffset={strokeDashoffset}
//                 style={{
//                   transformOrigin: '50% 50%',
//                   transition: 'stroke-dasharray 1s ease-in-out',
//                 }}
//               />
//             );
//           })}
//         </svg>
//       </div>
//       <div className="space-y-2">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <div className={`w-3 h-3 rounded-full ${item.color}`} />
//             <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
//             <span className="text-sm font-medium text-gray-800 dark:text-white">{item.value}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Charts = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('7d');

//   const salesData = [
//     { label: 'Jan', value: 45, color: 'bg-blue-500' },
//     { label: 'Feb', value: 52, color: 'bg-blue-500' },
//     { label: 'Mar', value: 38, color: 'bg-blue-500' },
//     { label: 'Apr', value: 61, color: 'bg-blue-500' },
//     { label: 'May', value: 55, color: 'bg-blue-500' },
//     { label: 'Jun', value: 67, color: 'bg-blue-500' },
//   ];

//   const revenueData = [12, 19, 15, 27, 22, 34, 28, 41, 35, 48, 42, 55];

//   const trafficSources = [
//     { label: 'Organic Search', value: 45, color: 'bg-emerald-500' },
//     { label: 'Direct', value: 25, color: 'bg-blue-500' },
//     { label: 'Social Media', value: 20, color: 'bg-purple-500' },
//     { label: 'Email', value: 10, color: 'bg-orange-500' },
//   ];

//   const deviceStats = [
//     { label: 'Desktop', value: 65, color: 'bg-indigo-500' },
//     { label: 'Mobile', value: 30, color: 'bg-pink-500' },
//     { label: 'Tablet', value: 5, color: 'bg-yellow-500' },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>
//         <div className="flex items-center space-x-3">
//           <select
//             value={selectedPeriod}
//             onChange={(e) => setSelectedPeriod(e.target.value)}
//             className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
//           >
//             <option value="7d">Last 7 days</option>
//             <option value="30d">Last 30 days</option>
//             <option value="90d">Last 90 days</option>
//             <option value="1y">Last year</option>
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ChartCard title="Monthly Sales" icon={<BarChart3 className="text-primary\" size={20} />}>
//           <BarChart data={salesData} />
//         </ChartCard>

//         <ChartCard title="Revenue Trend" icon={<TrendingUp className="text-primary\" size={20} />}>
//           <LineChart data={revenueData} color="bg-emerald-500" />
//         </ChartCard>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ChartCard title="Traffic Sources" icon={<PieChart className="text-primary\" size={20} />}>
//           <PieChartComponent data={trafficSources} />
//         </ChartCard>

//         <ChartCard title="Device Usage" icon={<Activity className="text-primary\" size={20} />}>
//           <PieChartComponent data={deviceStats} />
//         </ChartCard>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Performance Metrics</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             { label: 'Page Views', value: '2.4M', change: '+12%', color: 'bg-blue-500' },
//             { label: 'Unique Visitors', value: '1.2M', change: '+8%', color: 'bg-emerald-500' },
//             { label: 'Bounce Rate', value: '24%', change: '-3%', color: 'bg-red-500' },
//           ].map((metric, index) => (
//             <div key={index} className="text-center">
//               <div className={`w-16 h-16 ${metric.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
//                 <span className="text-white font-bold text-lg">{metric.value}</span>
//               </div>
//               <p className="text-gray-800 dark:text-white font-medium">{metric.label}</p>
//               <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
//                 {metric.change} from last month
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Charts;


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
