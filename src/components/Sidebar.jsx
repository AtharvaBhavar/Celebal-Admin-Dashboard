import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Table, 
  BarChart3, 
  Calendar, 
  Kanban, 
  Settings, 
  Menu,
  X,
  Palette,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tables', label: 'Tables', icon: Table },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'kanban', label: 'Kanban', icon: Kanban },
];

const Sidebar = ({ activeView, setActiveView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme();

  const colorSchemes = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'indigo', name: 'Indigo', color: 'bg-indigo-500' },
    { id: 'emerald', name: 'Emerald', color: 'bg-emerald-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
  ];

  return (
    <>
      <div className={`
        fixed top-0 left-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        transition-all duration-300 z-30 shadow-lg
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Admin Panel
            </h2>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <Icon size={20} />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            {!isCollapsed && <span>Toggle Theme</span>}
          </button>
          
          <button
            onClick={() => setShowThemeSettings(!showThemeSettings)}
            className={`
              w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors
              ${isCollapsed ? 'justify-center' : ''}
              text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
            `}
          >
            <Palette size={20} />
            {!isCollapsed && <span>Colors</span>}
          </button>
        </div>
      </div>

      {showThemeSettings && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowThemeSettings(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 z-50 w-80">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Color Scheme</h3>
            <div className="grid grid-cols-2 gap-3">
              {colorSchemes.map((scheme) => (
  <button
    key={scheme.id}
    onClick={() => {
      setColorScheme(scheme.id);
      setShowThemeSettings(false);  // close modal after selection
    }}
    className={`
      flex items-center space-x-3 p-3 rounded-lg border-2 transition-all
      ${colorScheme === scheme.id 
        ? 'border-primary bg-primary bg-opacity-10' 
        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
      }
    `}
  >
    <div className={`w-6 h-6 rounded-full ${scheme.color}`} />
    <span className="text-gray-700 dark:text-gray-300">{scheme.name}</span>
  </button>
))}

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;