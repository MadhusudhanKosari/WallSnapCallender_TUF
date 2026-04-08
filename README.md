# Interactive Calendar Component

A modern, responsive calendar component inspired by physical wall calendars with productivity-focused features for DSA (Data Structures & Algorithms) learning.

## 🌟 Features

### Core Features
- **Wall Calendar Aesthetic**: Monthly hero images that change with each month
- **Date Range Selection**: Select start and end dates with visual highlighting
- **Notes System**: Add notes for entire months or specific date ranges
- **Fully Responsive**: Optimized for desktop and mobile devices

### Unique Features
1. **Smart Color Highlight System**
   - Automatic Sunday highlighting (red tint)
   - Predefined holidays highlighting (orange)
   - Custom color assignment for any date
   - Right-click to access color picker

2. **DSA Progress Tracker**
   - Static roadmap: Arrays → Strings → Linked Lists → Stacks & Queues → Trees → Graphs
   - Automatic calendar mapping when started
   - Progress tracking with completion status
   - Visual progress indicators

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Date Selection
- Click any date to start selection
- Click another date to complete range selection
- Click again to reset selection

### Custom Colors
- Right-click any date to open color picker
- Choose from preset colors or remove existing colors
- Colors persist across sessions

### Notes
- Switch between "Month Notes" and "Range Notes"
- Month notes apply to the entire current month
- Range notes apply to selected date ranges
- All notes are saved automatically

### DSA Tracking
- Click "Start DSA Today" to begin
- Mark daily tasks as completed
- Track overall progress with visual indicators
- View upcoming tasks and deadlines

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **CSS3** - Clean, modern styling with CSS Grid and Flexbox
- **Local Storage** - Client-side data persistence
- **Unsplash Images** - High-quality monthly hero images

## 📱 Responsive Design

- **Desktop**: Side-by-side layout with calendar and sidebar
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Touch-friendly interactions and compact design

## 🎨 Design Philosophy

- **Minimal & Clean**: Focused on usability without clutter
- **Modern Aesthetics**: Soft shadows, smooth transitions, and thoughtful spacing
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Performance**: Lightweight with no heavy dependencies

## 📦 Project Structure

```
src/
├── components/
│   ├── CalendarContainer.js     # Main container component
│   ├── HeroImageSection.js      # Monthly hero images
│   ├── CalendarGrid.js          # Calendar date grid
│   ├── DateCell.js              # Individual date cells
│   ├── NotesPanel.js            # Notes management
│   └── DSAProgressPanel.js      # DSA tracking
├── App.js                       # Root component
└── index.js                     # Entry point
```

## 🔧 Customization

### Adding More Holidays
Edit the `holidays` object in `DateCell.js`:
```javascript
const holidays = {
  '1-1': 'New Year',
  '12-25': 'Christmas',
  // Add more holidays here
};
```

### Modifying DSA Roadmap
Update the `dsaRoadmap` array in `DSAProgressPanel.js`:
```javascript
const dsaRoadmap = [
  { topic: 'Arrays', days: 3 },
  { topic: 'Your Topic', days: 5 },
  // Customize the roadmap
];
```

### Changing Monthly Images
Replace URLs in the `monthImages` array in `HeroImageSection.js` with your preferred images.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.