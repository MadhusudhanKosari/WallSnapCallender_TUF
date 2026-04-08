import React from 'react';
import './HeroImageSection.css';

const monthImages = [
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop', // January - Winter
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop', // February - Love
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=400&fit=crop', // March - Spring
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop', // April - Flowers
  'https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=800&h=400&fit=crop', // May - Garden
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', // June - Summer
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop', // July - Beach
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop', // August - Mountains
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop', // September - Forest
  'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=400&fit=crop', // October - Autumn
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=400&fit=crop', // November - Fall
  'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=400&fit=crop'  // December - Winter
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const HeroImageSection = ({ currentDate, onNavigate }) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return (
    <div className="hero-section">
      <div className="hero-navigation">
        <button 
          className="nav-button"
          onClick={() => onNavigate(-1)}
          aria-label="Previous month"
        >
          ←
        </button>
        <div className="month-year">
          <h2 className="month-name">{monthNames[month]}</h2>
          <span className="year">{year}</span>
        </div>
        <button 
          className="nav-button"
          onClick={() => onNavigate(1)}
          aria-label="Next month"
        >
          →
        </button>
      </div>
      
      <div className="hero-image-container">
        <img 
          src={monthImages[month]} 
          alt={`${monthNames[month]} calendar image`}
          className="hero-image"
        />
        <div className="image-overlay">
          <div className="month-display">
            {monthNames[month]} {year}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImageSection;