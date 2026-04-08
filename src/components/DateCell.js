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
  selectedEndDate
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