import React, { useEffect, useState } from 'react';
import './DSAProgressPanel.css';

// Static DSA roadmap with flexible days
const dsaRoadmap = [
  { topic: 'Arrays', minDays: 2, maxDays: 5, priority: 1 },
  { topic: 'Strings', minDays: 1, maxDays: 3, priority: 2 },
  { topic: 'Linked Lists', minDays: 2, maxDays: 4, priority: 3 },
  { topic: 'Stacks & Queues', minDays: 1, maxDays: 3, priority: 4 },
  { topic: 'Trees', minDays: 3, maxDays: 6, priority: 5 },
  { topic: 'Graphs', minDays: 3, maxDays: 6, priority: 6 }
];

const DSAProgressPanel = ({
  currentDate,
  dsaProgress,
  onDSAProgressChange,
  dsaStarted,
  onDSAStart,
  dsaTotalDays,
  onDSATotalDaysChange
}) => {
  const [showDaysInput, setShowDaysInput] = useState(false);
  const [showStartDateInput, setShowStartDateInput] = useState(false);
  const [inputDays, setInputDays] = useState('');
  const [startDate, setStartDate] = useState('');

  // Generate DSA schedule when started
  useEffect(() => {
    if (dsaStarted && dsaTotalDays && startDate && Object.keys(dsaProgress).length === 0) {
      generateDSASchedule(dsaTotalDays, new Date(startDate));
    }
  }, [dsaStarted, dsaTotalDays, startDate]);

  const generateDSASchedule = (totalDays, startingDate) => {
    const schedule = {};
    let currentDay = new Date(startingDate);
    
    // Calculate days per topic based on total days
    const minTotalDays = dsaRoadmap.reduce((sum, topic) => sum + topic.minDays, 0);
    const maxTotalDays = dsaRoadmap.reduce((sum, topic) => sum + topic.maxDays, 0);
    
    let remainingDays = totalDays;
    const topicDays = {};
    
    // Distribute days proportionally
    dsaRoadmap.forEach((topic, index) => {
      if (index === dsaRoadmap.length - 1) {
        // Last topic gets remaining days
        topicDays[topic.topic] = Math.max(topic.minDays, remainingDays);
      } else {
        const ratio = (topic.maxDays - topic.minDays) / (maxTotalDays - minTotalDays);
        const extraDays = Math.floor((totalDays - minTotalDays) * ratio);
        const assignedDays = Math.min(topic.maxDays, topic.minDays + extraDays);
        topicDays[topic.topic] = assignedDays;
        remainingDays -= assignedDays;
      }
    });
    
    // Create schedule
    dsaRoadmap.forEach(({ topic }) => {
      const days = topicDays[topic];
      for (let i = 0; i < days; i++) {
        const dateKey = `${currentDay.getFullYear()}-${currentDay.getMonth()}-${currentDay.getDate()}`;
        schedule[dateKey] = {
          task: topic,
          completed: false,
          dayInTopic: i + 1,
          totalDays: days
        };
        currentDay.setDate(currentDay.getDate() + 1);
      }
    });
    
    onDSAProgressChange(schedule);
  };

  const handleStartDSA = () => {
    setShowDaysInput(true);
  };

  const handleDaysSubmit = () => {
    const days = parseInt(inputDays);
    if (days && days >= 10 && days <= 100) {
      onDSATotalDaysChange(days);
      setShowDaysInput(false);
      setShowStartDateInput(true);
    }
  };

  const handleStartDateSubmit = () => {
    if (startDate) {
      onDSAStart(true);
      setShowStartDateInput(false);
      setInputDays('');
    }
  };

  const handleResetDSA = () => {
    if (window.confirm('Are you sure you want to reset your DSA progress? This will delete all progress data.')) {
      onDSAProgressChange({});
      onDSAStart(false);
      onDSATotalDaysChange(null);
      setStartDate('');
      setInputDays('');
      setShowDaysInput(false);
      setShowStartDateInput(false);
    }
  };

  const handleMarkCompleted = (dateKey) => {
    const newProgress = { ...dsaProgress };
    if (newProgress[dateKey]) {
      newProgress[dateKey].completed = !newProgress[dateKey].completed;
      onDSAProgressChange(newProgress);
    }
  };

  const getProgressStats = () => {
    const totalTasks = Object.keys(dsaProgress).length;
    const completedTasks = Object.values(dsaProgress).filter(task => task.completed).length;
    return { total: totalTasks, completed: completedTasks };
  };

  const getTodayTask = () => {
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    return dsaProgress[todayKey];
  };

  const getUpcomingTasks = () => {
    const today = new Date();
    return Object.entries(dsaProgress)
      .filter(([dateKey, task]) => {
        const [year, month, day] = dateKey.split('-').map(Number);
        const taskDate = new Date(year, month, day);
        return taskDate >= today && !task.completed;
      })
      .slice(0, 5);
  };

  const getTopicProgress = () => {
    const topicStats = {};
    Object.values(dsaProgress).forEach(task => {
      if (!topicStats[task.task]) {
        topicStats[task.task] = { completed: 0, total: 0 };
      }
      topicStats[task.task].total++;
      if (task.completed) {
        topicStats[task.task].completed++;
      }
    });
    return topicStats;
  };

  if (!dsaStarted) {
    return (
      <div className="dsa-panel">
        <h3 className="dsa-title">🚀 DSA Progress Tracker</h3>
        
        {!showDaysInput && !showStartDateInput ? (
          <div className="dsa-intro">
            <p className="dsa-description">
              Start your DSA journey! Choose your timeline and we'll create a personalized roadmap.
            </p>
            <div className="roadmap-preview">
              <h4>Topics Covered:</h4>
              <ul className="roadmap-list">
                {dsaRoadmap.map(({ topic, minDays, maxDays }) => (
                  <li key={topic} className="roadmap-item">
                    <span className="topic-name">{topic}</span>
                    <span className="topic-days">{minDays}-{maxDays} days</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="start-dsa-button" onClick={handleStartDSA}>
              Start DSA Journey
            </button>
          </div>
        ) : showDaysInput ? (
          <div className="days-input-section">
            <h4 className="input-title">How many days do you want to complete DSA?</h4>
            <p className="input-description">
              Choose between 10-100 days. We'll distribute topics optimally based on your timeline.
            </p>
            <div className="days-input-container">
              <input
                type="number"
                min="10"
                max="100"
                value={inputDays}
                onChange={(e) => setInputDays(e.target.value)}
                placeholder="Enter days (10-100)"
                className="days-input"
              />
              <button 
                className="confirm-button"
                onClick={handleDaysSubmit}
                disabled={!inputDays || inputDays < 10 || inputDays > 100}
              >
                Next
              </button>
            </div>
            <button 
              className="back-button"
              onClick={() => setShowDaysInput(false)}
            >
              Back
            </button>
          </div>
        ) : (
          <div className="start-date-section">
            <h4 className="input-title">When do you want to start?</h4>
            <p className="input-description">
              Choose your start date. The DSA topics will be scheduled from this date for {inputDays} days.
            </p>
            <div className="start-date-container">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="date-input-large"
                min={new Date().toISOString().split('T')[0]}
              />
              <button 
                className="confirm-button"
                onClick={handleStartDateSubmit}
                disabled={!startDate}
              >
                Create Schedule
              </button>
            </div>
            <button 
              className="back-button"
              onClick={() => {
                setShowStartDateInput(false);
                setShowDaysInput(true);
              }}
            >
              Back
            </button>
          </div>
        )}
      </div>
    );
  }

  const stats = getProgressStats();
  const todayTask = getTodayTask();
  const upcomingTasks = getUpcomingTasks();
  const topicProgress = getTopicProgress();

  return (
    <div className="dsa-panel">
      <div className="dsa-header">
        <h3 className="dsa-title">🚀 DSA Progress Tracker</h3>
        <button className="reset-dsa-button" onClick={handleResetDSA}>
          🔄 Reset
        </button>
      </div>
      
      <div className="progress-overview">
        <div className="total-progress">
          <div className="progress-circle">
            <div className="progress-text">
              <span className="progress-percentage">{Math.round((stats.completed / stats.total) * 100)}%</span>
              <span className="progress-label">Complete</span>
            </div>
          </div>
        </div>
        
        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.total - stats.completed}</span>
            <span className="stat-label">Remaining</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{dsaTotalDays}</span>
            <span className="stat-label">Total Days</span>
          </div>
        </div>
      </div>

      {todayTask && (
        <div className="today-task">
          <h4 className="today-title">Today's Focus</h4>
          <div className="task-card">
            <div className="task-info">
              <span className="task-topic">{todayTask.task}</span>
              <span className="task-progress">
                Day {todayTask.dayInTopic} of {todayTask.totalDays}
              </span>
            </div>
            <button
              className={`complete-button ${todayTask.completed ? 'completed' : ''}`}
              onClick={() => {
                const today = new Date();
                const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
                handleMarkCompleted(todayKey);
              }}
            >
              {todayTask.completed ? '✓' : '○'}
            </button>
          </div>
        </div>
      )}

      {Object.keys(topicProgress).length > 0 && (
        <div className="topic-progress">
          <h4 className="topic-title">Topic Progress</h4>
          <div className="topics-list">
            {Object.entries(topicProgress).map(([topic, progress]) => (
              <div key={topic} className="topic-item">
                <div className="topic-header">
                  <span className="topic-name">{topic}</span>
                  <span className="topic-stats">{progress.completed}/{progress.total}</span>
                </div>
                <div className="topic-bar">
                  <div 
                    className="topic-fill"
                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {upcomingTasks.length > 0 && (
        <div className="upcoming-tasks">
          <h4 className="upcoming-title">Upcoming Tasks</h4>
          <div className="tasks-list">
            {upcomingTasks.slice(0, 3).map(([dateKey, task]) => {
              const [year, month, day] = dateKey.split('-').map(Number);
              const taskDate = new Date(year, month, day);
              return (
                <div key={dateKey} className="upcoming-task">
                  <div className="task-date">
                    {taskDate.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="task-name">{task.task}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DSAProgressPanel;