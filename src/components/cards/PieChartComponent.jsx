import React from 'react';

const PieChartComponent = ({ data, centerLabel = 'Total' }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 14;
  const strokeWidth = 4;
  const center = 18;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="flex items-center space-x-6">
      {/* Pie Chart */}
      <div className="relative w-36 h-36">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          {total > 0 &&
            data.map((item, index) => {
              const fraction = item.value / total;
              const dashLength = fraction * circumference;
              const dashArray = `${dashLength} ${circumference - dashLength}`;
              const dashOffset = -cumulative * circumference;
              cumulative += fraction;

              // Inline color map
              const stroke =
                {
                  'bg-emerald-500': '#10B981',
                  'bg-blue-500': '#3B82F6',
                  'bg-purple-500': '#8B5CF6',
                  'bg-orange-500': '#F97316',
                  'bg-red-500': '#EF4444',
                  'bg-yellow-500': '#F59E0B',
                  'bg-indigo-500': '#6366F1',
                  'bg-pink-500': '#EC4899',
                  'bg-teal-500': '#14B8A6',
                  'bg-cyan-500': '#06B6D4',
                  'bg-green-500': '#22C55E',
                  'bg-gray-500': '#6B7280',
                }[item.color] || '#6B7280';

              return (
                <circle
                  key={index}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  strokeWidth={strokeWidth}
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="butt"
                  stroke={stroke}
                />
              );
            })}
        </svg>

        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">{centerLabel}</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">{total}%</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
