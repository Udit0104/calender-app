import React, { useState } from 'react'
const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const startDay = firstDay.getDay();
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, currentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, currentMonth: true });
    }

    const endDay = lastDay.getDay();
    for (let i = 1; i < 7 - endDay; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, currentMonth: false });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-linear-to-br from-blue-50 to-indigo-100 shadow-2xl rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <button onClick={goToPreviousMonth} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">&lt;</button>
        <h2 className="text-2xl font-bold text-gray-800">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={goToNextMonth} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map(day => <div key={day} className="text-center font-semibold text-gray-600 py-2">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div key={index} className={`p-3 text-center border border-gray-300 rounded-lg transition-all duration-200 ${day.currentMonth ? 'text-gray-900 hover:bg-indigo-100 hover:shadow-md cursor-pointer' : 'text-gray-400'} ${isToday(day.date) ? 'bg-yellow-300 text-yellow-900 font-bold shadow-lg' : ''}`}>
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App
