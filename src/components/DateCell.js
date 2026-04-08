import React, { useState } from 'react';
import './DateCell.css';

// Static holidays (you can expand this)
const holidays = {
  '1-1': 'New Year',
  '2-14': 'Valentine\'s Day',
  '7-4': 'Independence Day',
  '10-31': 'Halloween',
  '12-25': 'Christmas'
};

const colorOptions = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Red', value: '#ef4444' }
];

const DateCell = ({
  date,
  isToday,
  isSelected,
  isInRange,
  onClick,
  coloredDates,
  onColorDate,
  dsaProgress,
  dsaStarted,
  selectedStartDate,
  selectedEndDate,
  notes,
  currentDate
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!date) {
    return <div className="date-cell empty"></div>;
  }

  const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const dayMonth = `${date.getMonth() + 1}-${date.getDate()}`;
  
  const isSunday = date.getDay() === 0;
  const isHoliday = holidays[dayMonth];
  const customColor = coloredDates[dateKey];
  const isDSACompleted = dsaProgress[dateKey]?.completed;
  const dsaTask = dsaProgress[dateKey]?.task;

  // Get notes for this date
  const getNotesForDate = () => {
    const dateNotes = [];
    
    // Check for specific date notes
    const specificDateKey = `date-${date.getTime()}`;
    if (notes[specificDateKey]) {
      dateNotes.push({
        type: 'date',
        content: notes[specificDateKey]
      });
    }
    
    // Check for range notes that include this date
    Object.entries(notes).forEach(([key, note]) => {
      if (key.startsWith('range-')) {
        const [, startTime, endTime] = key.split('-');
        const startDate = new Date(parseInt(startTime));
        const endDate = new Date(parseInt(endTime));
        
        if (date >= startDate && date <= endDate) {
          dateNotes.push({
            type: 'range',
            content: note
          });
        }
      }
    });
    
    // Check for month notes
    const monthKey = `month-${date.getFullYear()}-${date.getMonth()}`;
    if (notes[monthKey]) {
      dateNotes.push({
        type: 'month',
        content: notes[monthKey]
      });
    }
    
    return dateNotes;
  };

  const dateNotes = getNotesForDate();

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowColorPicker(!showColorPicker);
  };

  const handleColorSelect = (color) => {
    const newColoredDates = { ...coloredDates };
    if (color === 'remove') {
      delete newColoredDates[dateKey];
    } else {
      newColoredDates[dateKey] = color;
    }
    onColorDate(newColoredDates);
    setShowColorPicker(false);
  };

  let cellClass = 'date-cell';
  if (isToday) cellClass += ' today';
  if (isSelected) {
    if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) {
      cellClass += ' selected start-date';
    } else if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) {
      cellClass += ' selected end-date';
    }
  }
  if (isInRange && !isSelected) cellClass += ' in-range';
  if (isSunday) cellClass += ' sunday';
  if (isHoliday) cellClass += ' holiday';
  if (isDSACompleted) cellClass += ' dsa-completed';

  return (
    <div 
      className={cellClass}
      onClick={onClick}
      onContextMenu={handleRightClick}
      style={{
        backgroundColor: customColor || undefined
      }}
    >
      <div className="date-number">
        {date.getDate()}
        {isSelected && selectedStartDate && date.getTime() === selectedStartDate.getTime() && (
          <span className="date-symbol start">📅</span>
        )}
        {isSelected && selectedEndDate && date.getTime() === selectedEndDate.getTime() && (
          <span className="date-symbol end">🏁</span>
        )}
      </div>
      
      {/* Display Notes - Limited and Compact */}
      {dateNotes.length > 0 && (
        <div className="date-notes">
          {dateNotes.slice(0, 1).map((note, index) => (
            <div 
              key={index} 
              className={`note-dot ${note.type}`}
              title={`${note.type}: ${note.content}`}
            >
              {note.type === 'date' && '•'}
              {note.type === 'range' && '•'}
              {note.type === 'month' && '•'}
            </div>
          ))}
          {dateNotes.length > 1 && (
            <div className="note-count" title={`${dateNotes.length} notes total`}>
              +{dateNotes.length - 1}
            </div>
          )}
        </div>
      )}
      
      {dsaTask && (
        <div className="dsa-task">
          {dsaTask}
        </div>
      )}
      
      {isHoliday && (
        <div className="holiday-indicator" title={isHoliday}>
          🎉
        </div>
      )}
      
      {showColorPicker && (
        <div className="color-picker">
          <div className="color-options">
            {colorOptions.map(color => (
              <button
                key={color.value}
                className="color-option"
                style={{ backgroundColor: color.value }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorSelect(color.value);
                }}
                title={color.name}
              />
            ))}
            <button
              className="color-option remove"
              onClick={(e) => {
                e.stopPropagation();
                handleColorSelect('remove');
              }}
              title="Remove color"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateCell;