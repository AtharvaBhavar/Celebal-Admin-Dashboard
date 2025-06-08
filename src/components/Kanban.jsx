import React, { useState } from 'react';
import { Plus, MoreHorizontal, Clock, AlertCircle, CheckCircle, User } from 'lucide-react';

const mockColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-gray-100 dark:bg-gray-700',
    tasks: [
      {
        id: 1,
        title: 'Design landing page',
        description: 'Create wireframes and mockups for the new landing page',
        priority: 'high',
        assignee: 'Alice Johnson',
        dueDate: '2024-03-20',
        tags: ['Design', 'Frontend']
      },
      {
        id: 2,
        title: 'Setup database schema',
        description: 'Design and implement the database structure',
        priority: 'medium',
        assignee: 'Bob Smith',
        dueDate: '2024-03-22',
        tags: ['Backend', 'Database']
      }
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: 'bg-blue-100 dark:bg-blue-900',
    tasks: [
      {
        id: 3,
        title: 'Implement user authentication',
        description: 'Add login, register, and password reset functionality',
        priority: 'high',
        assignee: 'Carol Williams',
        dueDate: '2024-03-18',
        tags: ['Frontend', 'Security']
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: 'bg-yellow-100 dark:bg-yellow-900',
    tasks: [
      {
        id: 4,
        title: 'API documentation',
        description: 'Write comprehensive API documentation',
        priority: 'medium',
        assignee: 'David Brown',
        dueDate: '2024-03-25',
        tags: ['Documentation']
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-100 dark:bg-green-900',
    tasks: [
      {
        id: 5,
        title: 'Project setup',
        description: 'Initialize project structure and dependencies',
        priority: 'low',
        assignee: 'Emma Davis',
        dueDate: '2024-03-15',
        tags: ['Setup']
      }
    ]
  }
];

const Kanban = () => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('kanban-columns');
    return savedColumns ? JSON.parse(savedColumns) : mockColumns;
  });
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: '',
    columnId: 'todo'
  });

  const saveColumnsToStorage = (updatedColumns) => {
    localStorage.setItem('kanban-columns', JSON.stringify(updatedColumns));
    setColumns(updatedColumns);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const taskToAdd = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    const updatedColumns = columns.map(column => {
      if (column.id === newTask.columnId) {
        return {
          ...column,
          tasks: [...column.tasks, taskToAdd]
        };
      }
      return column;
    });

    saveColumnsToStorage(updatedColumns);
    
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: '',
      columnId: 'todo'
    });
    setShowTaskModal(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle size={14} />;
      case 'medium': return <Clock size={14} />;
      case 'low': return <CheckCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const handleDragStart = (task, columnId) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    
    if (!draggedTask || !draggedFromColumn) return;

    const updatedColumns = columns.map(column => {
      if (column.id === draggedFromColumn) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== draggedTask.id)
        };
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, draggedTask]
        };
      }
      return column;
    });

    saveColumnsToStorage(updatedColumns);
    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  // const TaskCard = ({ task, columnId }) => (
  //   <div
  //     draggable
  //     onDragStart={() => handleDragStart(task, columnId)}
  //     className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move border border-gray-200 dark:border-gray-700"
  //   >
  //     <div className="flex items-start justify-between mb-2">
  //       <h4 className="font-medium text-gray-800 dark:text-white text-sm">{task.title}</h4>
  //       <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
  //         <MoreHorizontal size={16} />
  //       </button>
  //     </div>
      
  //     <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
  //       {task.description}
  //     </p>

  //     <div className="flex items-center justify-between mb-3">
  //       <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(task.priority)}`}>
  //         {getPriorityIcon(task.priority)}
  //         <span className="capitalize">{task.priority}</span>
  //       </div>
  //       <div className="text-xs text-gray-500 dark:text-gray-400">
  //         {new Date(task.dueDate).toLocaleDateString()}
  //       </div>
  //     </div>

  //     <div className="flex flex-wrap gap-1 mb-3">
  //       {task.tags.map((tag, index) => (
  //         <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded">
  //           {tag}
  //         </span>
  //       ))}
  //     </div>

  //     <div className="flex items-center space-x-2">
  //       <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
  //         {task.assignee.split(' ').map(n => n[0]).join('')}
  //       </div>
  //       <span className="text-xs text-gray-600 dark:text-gray-400">{task.assignee}</span>
  //     </div>
  //   </div>
  // );


  const TaskCard = ({ task, columnId }) => {
  const TickIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <path d="m9 11 3 3L22 4"></path>
    </svg>
  );

  return (
    <div
      draggable
      onDragStart={() => handleDragStart(task, columnId)}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-800 dark:text-white text-sm">{task.title}</h4>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between mb-3 space-x-2">
        {columnId === 'done' ? (
          <>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs text-white bg-green-500">
              <TickIcon />
              <span className="capitalize">done</span>
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(task.priority)}`}>
              {getPriorityIcon(task.priority)}
              <span className="capitalize">{task.priority}</span>
            </div>
          </>
        ) : (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(task.priority)}`}>
            {getPriorityIcon(task.priority)}
            <span className="capitalize">{task.priority}</span>
          </div>
        )}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-medium">
          {task.assignee.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">{task.assignee}</span>
      </div>
    </div>
  );
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Kanban Board</h1>
        <button
          onClick={() => setShowTaskModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(column => (
          <div
            key={column.id}
            className={`${column.color} rounded-xl p-4 min-h-96`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {column.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                {column.tasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {column.tasks.map(task => (
                <TaskCard key={task.id} task={task} columnId={column.id} />
              ))}
            </div>

            <button 
              onClick={() => {
                setNewTask({...newTask, columnId: column.id});
                setShowTaskModal(true);
              }}
              className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={16} />
              <span>Add a task</span>
            </button>
          </div>
        ))}
      </div>

      {showTaskModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowTaskModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 z-50 w-96 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Create New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Task title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Column</label>
                <select 
                  value={newTask.columnId}
                  onChange={(e) => setNewTask({...newTask, columnId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  {columns.map(column => (
                    <option key={column.id} value={column.id}>{column.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date *</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assignee *</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Assignee name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                <input
                  type="text"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Comma-separated tags"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Kanban;