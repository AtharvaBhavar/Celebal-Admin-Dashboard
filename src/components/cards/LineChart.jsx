import React from 'react';

const LineChart = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const coordinates = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : 100 - ((value - min) / range) * 100;
    return { x, y, value };
  });

  const points = coordinates.map(p => `${p.x},${p.y}`).join(' ');
  const polygonPoints = `${points} 100,100 0,100`;

  return (
    <div className="h-48 w-full relative">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className={color.replace('bg-', 'stop-')} stopOpacity="0.3" />
            <stop offset="100%" className={color.replace('bg-', 'stop-')} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          points={points}
          className={color.replace('bg-', 'text-')}
        />
        <polygon
          fill="url(#gradient)"
          points={polygonPoints}
        />
      </svg>

      {/* Aligned data points */}
      <div className="absolute inset-0">
        {coordinates.map((point, index) => (
          <div
            key={index}
            title={`Value: ${point.value}`}
            className={`w-2 h-2 rounded-full ${color} opacity-80 hover:opacity-100 transition-opacity`}
            style={{
              position: 'absolute',
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LineChart;
