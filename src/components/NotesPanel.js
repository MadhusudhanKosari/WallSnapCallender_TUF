import React, { useState, useEffect } from 'react';
import './NotesPanel.css';

const NotesPanel = ({
  selectedStartDate,
  selectedEndDate,
  currentDate,
  notes,
  onNotesChange,
  onDateChange
}) => {
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('month');
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [showMonthNotes, setShowMonthNotes] = useState(true);

  // Update date inputs when selection changes
  useEffect(() => {
    if (selectedStartDate) {
      setStartDateInput(selectedStartDate.toISOString().split('T')[0]);
    } else {
      setStartDateInput('');
    }
    
    if (selectedEndDate) {
      setEndDateInput(selectedEndDate.toISOString().split('T')[0]);
    } else {
      setEndDateInput('');
    }
  }, [selectedStartDate, selectedEndDate]);

  // Generate note key based on selection
  const getNoteKey = () => {
    if (noteType === 'date' && selectedStartDate && !selectedEndDate) {
      return `date-${selectedStartDate.getTime()}`;
    }
    if (noteType === 'range' && selectedStartDate && selectedEndDate) {
      return `range-${selectedStartDate.getTime()}-${selectedEndDate.getTime()}`;
    }
    return `month-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  };

  // Load existing note when selection changes
  useEffect(() => {
    const key = getNoteKey();
    setNoteText(notes[key] || '');
  }, [selectedStartDate, selectedEndDate, currentDate, noteType, notes]);

  // Auto-select note type based on selection
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      setNoteType('range');
    } else if (selectedStartDate && !selectedEndDate) {
      setNoteType('date');
    }
  }, [selectedStartDate, selectedEndDate]);

  const handleSaveNote = () => {
    const key = getNoteKey();
    const newNotes = { ...notes };
    
    if (noteText.trim()) {
      newNotes[key] = noteText.trim();
    } else {
      delete newNotes[key];
    }
    
    onNotesChange(newNotes);
  };

  const handleResetNote = () => {
    const key = getNoteKey();
    const newNotes = { ...notes };
    delete newNotes[key];
    onNotesChange(newNotes);
    setNoteText('');
  };

  const handleResetAllNotes = () => {
    if (window.confirm('Are you sure you want to delete all notes? This action cannot be undone.')) {
      onNotesChange({});
      setNoteText('');
    }
  };

  const handleDateInputChange = (type, value) => {
    if (type === 'start') {
      setStartDateInput(value);
      onDateChange('start', value);
    } else {
      setEndDateInput(value);
      onDateChange('end', value);
    }
  };

  const formatDateRange = () => {
    if (selectedStartDate && selectedEndDate) {
      const start = selectedStartDate.toLocaleDateString();
      const end = selectedEndDate.toLocaleDateString();
      return `${start} - ${end}`;
    }
    if (selectedStartDate) {
      return selectedStartDate.toLocaleDateString();
    }
    return 'No dates selected';
  };

  const getCurrentMonth = () => {
    return currentDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getRelevantNotes = () => {
    const relevantNotes = [];
    
    // Always show month notes if toggle is on
    const monthKey = `month-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    if (notes[monthKey] && showMonthNotes) {
      relevantNotes.push({
        type: 'Month',
        content: notes[monthKey],
        key: monthKey
      });
    }

    // Show date notes if single date selected
    if (selectedStartDate && !selectedEndDate) {
      const dateKey = `date-${selectedStartDate.getTime()}`;
      if (notes[dateKey]) {
        relevantNotes.push({
          type: 'Date',
          content: notes[dateKey],
          key: dateKey
        });
      }
    }

    // Show range notes if range selected
    if (selectedStartDate && selectedEndDate) {
      const rangeKey = `range-${selectedStartDate.getTime()}-${selectedEndDate.getTime()}`;
      if (notes[rangeKey]) {
        relevantNotes.push({
          type: 'Range',
          content: notes[rangeKey],
          key: rangeKey
        });
      }
    }

    return relevantNotes;
  };

  const relevantNotes = getRelevantNotes();

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <h3 className="notes-title">📝 Notes</h3>
        <button className="reset-all-button" onClick={handleResetAllNotes}>
          🗑️ Reset All
        </button>
      </div>
      
      {/* Date Range Editor */}
      <div className="date-editor">
        <h4 className="editor-title">Date Selection</h4>
        <div className="date-inputs">
          <div className="date-input-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDateInput}
              onChange={(e) => handleDateInputChange('start', e.target.value)}
              className="date-input"
            />
          </div>
          <div className="date-input-group">
            <label>End Date</label>
            <input
              type="date"
              value={endDateInput}
              onChange={(e) => handleDateInputChange('end', e.target.value)}
              className="date-input"
            />
          </div>
        </div>
      </div>

      {/* Note Type Selector */}
      <div className="note-type-selector">
        <button
          className={`type-button ${noteType === 'month' ? 'active' : ''}`}
          onClick={() => setNoteType('month')}
        >
          Month Notes
        </button>
        <button
          className={`type-button ${noteType === 'date' ? 'active' : ''}`}
          onClick={() => setNoteType('date')}
          disabled={!selectedStartDate || selectedEndDate}
        >
          Date Notes
        </button>
        <button
          className={`type-button ${noteType === 'range' ? 'active' : ''}`}
          onClick={() => setNoteType('range')}
          disabled={!selectedStartDate || !selectedEndDate}
        >
          Range Notes
        </button>
      </div>

      {/* Note Context */}
      <div className="note-context">
        {noteType === 'month' && (
          <div className="context-info">
            <span className="context-label">For:</span>
            <span className="context-value">{getCurrentMonth()}</span>
          </div>
        )}
        {noteType === 'date' && (
          <div className="context-info">
            <span className="context-label">For:</span>
            <span className="context-value">
              {selectedStartDate ? selectedStartDate.toLocaleDateString() : 'Select a date'}
            </span>
          </div>
        )}
        {noteType === 'range' && (
          <div className="context-info">
            <span className="context-label">For:</span>
            <span className="context-value">{formatDateRange()}</span>
          </div>
        )}
      </div>

      {/* Note Textarea */}
      <textarea
        className="note-textarea"
        placeholder={
          noteType === 'month' 
            ? `Add notes for ${getCurrentMonth()}...`
            : noteType === 'date'
              ? selectedStartDate 
                ? `Add notes for ${selectedStartDate.toLocaleDateString()}...`
                : 'Select a date to add notes...'
              : selectedStartDate && selectedEndDate
                ? `Add notes for selected range...`
                : 'Select date range to add notes...'
        }
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        disabled={
          (noteType === 'date' && !selectedStartDate) ||
          (noteType === 'range' && (!selectedStartDate || !selectedEndDate))
        }
      />

      <div className="note-actions">
        <button
          className="save-button"
          onClick={handleSaveNote}
          disabled={
            (noteType === 'date' && !selectedStartDate) ||
            (noteType === 'range' && (!selectedStartDate || !selectedEndDate))
          }
        >
          Save Note
        </button>
        
        {((noteType === 'month') || 
          (noteType === 'date' && selectedStartDate) || 
          (noteType === 'range' && selectedStartDate && selectedEndDate)) && 
          notes[getNoteKey()] && (
          <button
            className="reset-button"
            onClick={handleResetNote}
          >
            🗑️ Delete
          </button>
        )}
      </div>

      {/* Relevant Notes Display */}
      {relevantNotes.length > 0 && (
        <div className="relevant-notes">
          <div className="relevant-notes-header">
            <h4 className="relevant-notes-title">Current Notes</h4>
            {notes[`month-${currentDate.getFullYear()}-${currentDate.getMonth()}`] && (
              <button 
                className="toggle-month-notes"
                onClick={() => setShowMonthNotes(!showMonthNotes)}
              >
                {showMonthNotes ? '👁️ Hide Month' : '👁️ Show Month'}
              </button>
            )}
          </div>
          <div className="notes-list">
            {relevantNotes.map((note) => (
              <div key={note.key} className={`note-item ${note.type.toLowerCase()}`}>
                <div className="note-type-badge">{note.type}</div>
                <div className="note-preview">
                  {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPanel;