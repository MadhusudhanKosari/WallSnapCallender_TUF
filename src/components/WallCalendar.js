import React from 'react';
import CalendarGrid from './CalendarGrid';
import './WallCalendar.css';

const monthImages = [
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop', // January - Winter
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=500&fit=crop', // February - Love
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=500&fit=crop', // March - Spring
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop', // April - Flowers
  'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=500&fit=crop', // May - Garden
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop', // June - Summer
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop', // July - Beach
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop', // August - Mountains
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=500&fit=crop', // September - Forest
  'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=500&fit=crop', // October - Autumn
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=500&fit=crop', // November - Fall
  'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=500&fit=crop'  // December - Winter
];

const monthNames = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const WallCalendar = ({
  currentDate,
  onNavigate,
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
  coloredDates,
  onColorDate,
  dsaProgress,
  dsaStarted,
  isFlipping,
  notes
}) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return (
    <div className="wall-calendar">
      {/* Calendar Spiral Binding */}
      <div className="spiral-binding">
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
        <div className="spiral-ring"></div>
      </div>

      {/* Calendar Paper */}
      <div className={`calendar-paper ${isFlipping ? 'flipping' : ''}`}>
        {/* Navigation */}
        <div className="calendar-nav">
          <button 
            className="nav-btn prev"
            onClick={() => onNavigate(-1)}
            disabled={isFlipping}
          >
            ‹
          </button>
          <div className="month-year-display">
            <span className="year-small">{year}</span>
          </div>
          <button 
            className="nav-btn next"
            onClick={() => onNavigate(1)}
            disabled={isFlipping}
          >
            ›
          </button>
        </div>

        {/* Hero Image Section */}
        <div className="hero-image-section">
          <div className="image-container">
            <img 
              src={monthImages[month]} 
              alt={`${monthNames[month]} calendar`}
              className="hero-image"
            />
            <div className="month-overlay">
              <h1 className="month-title">{monthNames[month]}</h1>
            </div>
          </div>
        </div>

        {/* Notes Lines (like physical calendar) */}
        <div className="notes-lines">
          <div className="note-line"></div>
          <div className="note-line"></div>
          <div className="note-line"></div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-section">
          <CalendarGrid
            currentDate={currentDate}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateSelect={onDateSelect}
            coloredDates={coloredDates}
            onColorDate={onColorDate}
            dsaProgress={dsaProgress}
            dsaStarted={dsaStarted}
            notes={notes}
          />
        </div>
      </div>

      {/* Calendar Shadow */}
      <div className="calendar-shadow"></div>
    </div>
  );
};

export default WallCalendar;