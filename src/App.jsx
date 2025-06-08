import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tables from './components/Tables';
import Charts from './components/Charts';
import Calendar from './components/Calendar';
import Kanban from './components/Kanban';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tables':
        return <Tables />;
      case 'charts':
        return <Charts />;
      case 'calendar':
        return <Calendar />;
      case 'kanban':
        return <Kanban />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
<div className="min-h-screen h-full bg-white text-black dark:bg-gray-900 dark:text-white">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 ml-64 p-8">
          {renderActiveView()}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;