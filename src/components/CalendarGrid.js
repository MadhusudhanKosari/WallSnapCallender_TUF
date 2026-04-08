import React from 'react';
import DateCell from './DateCell';
import './CalendarGrid.css';

const CalendarGrid = ({
  currentDate,
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  coloredDates,
  onColorDate,
  dsaProgress,
  dsaStarted,
  notes
}) => {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Create array of dates for the calendar
  const calendarDates = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDates.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDates.push(new Date(year, month, day));
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-grid-container">
      <div className="weekdays">
        {weekDays.map(day => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {calendarDates.map((date, index) => (
          <DateCell
            key={index}
            date={date}
            isToday={date && 
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear()
            }
            isSelected={date && (
              (selectedStartDate && date.getTime() === selectedStartDate.getTime()) ||
              (selectedEndDate && date.getTime() === selectedEndDate.getTime())
            )}
            isInRange={date && selectedStartDate && selectedEndDate &&
              date >= selectedStartDate && date <= selectedEndDate
            }
            onClick={() => date && onDateSelect(date)}
            coloredDates={coloredDates}
            onColorDate={onColorDate}
            dsaProgress={dsaProgress}
            dsaStarted={dsaStarted}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            notes={notes}
            currentDate={currentDate}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;