import React, { useState } from 'react';
import {
  Edit,
  Trash2,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';

const CLockInApp = () => {
  const [currentView, setCurrentView] = useState('calendar'); // 'login', 'signup', 'calendar'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminderDialog, setReminderDialog] = useState({ open: false, mode: 'create', reminder: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, reminder: null });
  
  // Add missing formData state
  const [formData, setFormData] = useState({
    description: '',
    day: '',
    time: '',
    priority: '',
    category: ''
  });
  
  // Data
  const [reminders, setReminders] = useState([
    { id: 1, description: 'Financial Advisor Meeting', day: 7, month: 8, year: 2025, time: '', priority: 'Importante', category: 'Recordatorio' },
    { id: 2, description: 'Interview w/ Figma', day: 8, month: 8, year: 2025, time: '', priority: 'Importante', category: 'Recordatorio' },
    { id: 3, description: 'Reunión', day: 8, month: 8, year: 2025, time: '10:00 am', priority: 'Martes', category: 'Alarma' },
    { id: 4, description: "Ashley's Choir Recital", day: 12, month: 8, year: 2025, time: '', priority: 'Urgente', category: 'Recordatorio' }
  ]);

  // Helper functions for date calculations
  const getMonthName = (date) => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[date.getMonth()];
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Function to get reminders for a specific day
  const getRemindersForDay = (day) => {
    return reminders.filter(reminder => 
      reminder.day === day && 
      reminder.month === currentDate.getMonth() + 1 && 
      reminder.year === currentDate.getFullYear()
    );
  };

  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Log In</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario:</label>
              <input
                type="text"
                placeholder="usuario"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña:</label>
              <input
                type="password"
                placeholder="contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setCurrentView('calendar')}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setCurrentView('signup')}
              className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SignupForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Crear Cuenta</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario:</label>
              <input
                type="text"
                placeholder="usuario"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo:</label>
              <input
                type="email"
                placeholder="correo"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña:</label>
              <input
                type="password"
                placeholder="contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña:</label>
              <input
                type="password"
                placeholder="contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setCurrentView('calendar')}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Crear Cuenta
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="w-full text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
    const todayDate = today.getDate();
    
    const days = [];
    
    // Previous month days
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="h-32 p-2 text-gray-400 bg-blue-50 border border-white">
          <div className="text-sm font-medium">{daysInPrevMonth - i}</div>
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayReminders = getRemindersForDay(day);
      const isToday = isCurrentMonth && day === todayDate;
      
      days.push(
        <div key={day} className={`h-32 p-2 bg-blue-100 border border-white relative ${isToday ? 'bg-blue-200' : ''}`}>
          <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-blue-800' : 'text-gray-800'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayReminders.map((reminder, idx) => (
              <div
                key={idx}
                className={`text-xs leading-tight font-medium px-1.5 py-0.5 rounded ${getCategoryColor(reminder.category)}`}
                title={reminder.description}
              >
                {reminder.description}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Next month days to fill the grid
    const totalCellsUsed = firstDay + daysInMonth;
    const remainingCells = totalCellsUsed % 7 === 0 ? 0 : 7 - (totalCellsUsed % 7);
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="h-32 p-2 text-gray-400 bg-blue-50 border border-white">
          <div className="text-sm font-medium">{day}</div>
        </div>
      );
    }
    
    return days;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgente': return 'bg-red-100 text-red-800';
      case 'Importante': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Recordatorio': return 'bg-blue-200 text-gray-800';
      case 'Alarma': return 'bg-green-200 text-gray-800';
      case 'Evento': return 'bg-purple-200 text-gray-800';
      case 'Reunión': return 'bg-orange-200 text-gray-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const openReminderDialog = (mode, reminder = null) => {
    if (reminder) {
      setFormData({
        description: reminder.description,
        day: reminder.day,
        time: reminder.time,
        priority: reminder.priority,
        category: reminder.category
      });
    } else {
      setFormData({
        description: '',
        day: '',
        time: '',
        priority: '',
        category: ''
      });
    }
    setReminderDialog({ open: true, mode, reminder });
  };

  const closeReminderDialog = () => {
    setReminderDialog({ open: false, mode: 'create', reminder: null });
    setFormData({
      description: '',
      day: '',
      time: '',
      priority: '',
      category: ''
    });
  };

  const CalendarView = () => (
    <div className="flex h-screen">
      {/* Recordatorios */}
      <div className="w-1/4 bg-gray-50 p-4 overflow-y-auto border-r">
        <h3 className="text-2xl text-gray-900 p-4">
          Próximos Eventos
        </h3>
        <div className="space-y-3">
          {reminders.slice(0, 4).map((reminder) => (
            <div key={reminder.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block text-blue-800 text-xs px-2 py-1 rounded">
                  {reminder.category}
                </span>
                {reminder.category !== 'Alarma' && (
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => openReminderDialog('edit', reminder)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => setDeleteDialog({ open: true, reminder })}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              <h4 className="font-medium text-gray-900 mb-1 text-sm">{reminder.description}</h4>
              <div className="flex flex-wrap gap-1 items-center text-xs">
                <span className={`inline-block px-2 py-1 rounded text-xs ${getPriorityColor(reminder.priority)}`}>
                  {reminder.priority}
                </span>
                <span className="text-gray-600">{reminder.day}/{reminder.month}</span>
                {reminder.time && (
                  <div className="flex items-center text-gray-600">
                    <Clock size={10} className="mr-1" />
                    {reminder.time}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {}}
          className="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
        >
          <Plus size={18} className="mr-2" />
          Crear Recordatorio
        </button>
      </div>

      {/* Main Calendar */}
      <div className="flex-1 p-5 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-lato">
            {getMonthName(currentDate)} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Hoy
            </button>
            <button 
              onClick={() => navigateMonth(1)}
              className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-sm border h-full overflow-hidden">
          <div className="grid grid-cols-7 gap-0 h-full">
            {/* Day Headers */}
            {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(day => (
              <div key={day} className="p-4 text-center font-semibold text-gray-700 border-b bg-gray-50">
                {day}
              </div>
            ))}
            {/* Calendar Days */}
            <CalendarGrid />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header style={{ backgroundColor: "#4C7BAE" }} className="text-white">
        <div className="px-6 py-4">
          <h1 className="text-7xl font-bold text-center font-adlam">
            C-Lock In
          </h1>
        </div>
      </header>

      {/* Content */}
      {currentView === 'login' && <LoginForm />}
      {currentView === 'signup' && <SignupForm />}
      {currentView === 'calendar' && <CalendarView />}

    </div>
  );
};

export default CLockInApp;