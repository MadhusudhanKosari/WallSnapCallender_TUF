import React, { useState, useEffect } from 'react';
import WallCalendar from './WallCalendar';
import NotesPanel from './NotesPanel';
import DSAProgressPanel from './DSAProgressPanel';
import './CalendarContainer.css';

const CalendarContainer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [coloredDates, setColoredDates] = useState({});
  const [dsaProgress, setDsaProgress] = useState({});
  const [dsaStarted, setDsaStarted] = useState(false);
  const [dsaTotalDays, setDsaTotalDays] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-notes');
    const savedColors = localStorage.getItem('calendar-colors');
    const savedDSA = localStorage.getItem('calendar-dsa');
    const savedDSAStarted = localStorage.getItem('calendar-dsa-started');
    const savedDSATotalDays = localStorage.getItem('calendar-dsa-total-days');

    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedColors) setColoredDates(JSON.parse(savedColors));
    if (savedDSA) setDsaProgress(JSON.parse(savedDSA));
    if (savedDSAStarted) setDsaStarted(JSON.parse(savedDSAStarted));
    if (savedDSATotalDays) setDsaTotalDays(JSON.parse(savedDSATotalDays));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('calendar-colors', JSON.stringify(coloredDates));
  }, [coloredDates]);

  useEffect(() => {
    localStorage.setItem('calendar-dsa', JSON.stringify(dsaProgress));
  }, [dsaProgress]);

  useEffect(() => {
    localStorage.setItem('calendar-dsa-started', JSON.stringify(dsaStarted));
  }, [dsaStarted]);

  useEffect(() => {
    if (dsaTotalDays) {
      localStorage.setItem('calendar-dsa-total-days', JSON.stringify(dsaTotalDays));
    }
  }, [dsaTotalDays]);

  const navigateMonth = (direction) => {
    setIsFlipping(true);
    
    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + direction);
      setCurrentDate(newDate);
      
      setTimeout(() => {
        setIsFlipping(false);
      }, 300);
    }, 150);
  };

  const handleDateSelect = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  const handleDateChange = (type, dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return;

    if (type === 'start') {
      setSelectedStartDate(date);
      if (selectedEndDate && date > selectedEndDate) {
        setSelectedEndDate(null);
      }
    } else {
      setSelectedEndDate(date);
      if (selectedStartDate && date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(selectedStartDate);
      }
    }
  };

  return (
    <div className="calendar-app">
      <div className="wall-calendar-container">
        <WallCalendar
          currentDate={currentDate}
          onNavigate={navigateMonth}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          onDateSelect={handleDateSelect}
          coloredDates={coloredDates}
          onColorDate={setColoredDates}
          dsaProgress={dsaProgress}
          dsaStarted={dsaStarted}
          isFlipping={isFlipping}
          notes={notes}
        />
      </div>
      
      <div className="sidebar">
        <NotesPanel
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          currentDate={currentDate}
          notes={notes}
          onNotesChange={setNotes}
          onDateChange={handleDateChange}
        />
        <DSAProgressPanel
          currentDate={currentDate}
          dsaProgress={dsaProgress}
          onDSAProgressChange={setDsaProgress}
          dsaStarted={dsaStarted}
          onDSAStart={setDsaStarted}
          dsaTotalDays={dsaTotalDays}
          onDSATotalDaysChange={setDsaTotalDays}
        />
      </div>
    </div>
  );
};

export default CalendarContainer;