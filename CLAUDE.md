# Claude Development Guide

This file contains information for AI assistants working on the Hebrew Calendar project.

## Project Overview

A React-based Hebrew calendar application that displays Hebrew dates, months, and years using the @hebcal/core library. The app features event management and a responsive mobile-first design.

## Tech Stack

- **React 19.1.1** - UI framework
- **Vite 7.1.5** - Build tool and dev server
- **Tailwind CSS 3.3.3** - Styling framework
- **@hebcal/core 5.10.1** - Hebrew calendar calculations
- **Lucide React** - Icons
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/
│   ├── Calendar.jsx           # Main calendar container (99 lines)
│   ├── CalendarHeader.jsx     # Header with navigation and date display
│   ├── CalendarGrid.jsx       # Calendar grid with Hebrew date logic
│   ├── CalendarDay.jsx        # Individual day cell component
│   ├── EventsPanel.jsx        # Events section container
│   ├── EventForm.jsx          # Form for adding new events
│   ├── EventList.jsx          # List of events for selected date
│   └── EventItem.jsx          # Individual event item display
├── App.jsx                    # App entry point
├── main.jsx                   # React DOM render
└── index.css                  # Global styles with Tailwind directives
```

## Key Components Architecture

The app uses a modular component structure:
- **Calendar.jsx** manages state and coordinates between components
- **Hebrew date handling** via @hebcal/core HDate class
- **Event management** with localStorage-like state management
- **Responsive design** with Tailwind CSS utilities

## Hebrew Calendar Integration

Uses `@hebcal/core` library with `HDate` class:
- `new HDate()` - Current Hebrew date
- `hdate.getMonthName()` - Hebrew month names (תשרי, חשון, etc.)
- `hdate.getFullYear()` - Hebrew year (5785)
- `hdate.daysInMonth()` - Days in Hebrew month (29/30)
- `hdate.greg()` - Convert to Gregorian date

## Common Commands

### Development
```bash
npm run dev          # Start development server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Tailwind CSS
- Uses `@tailwind` directives in `src/index.css`
- Configuration in `tailwind.config.js`
- PostCSS config in `postcss.config.js`

## Code Conventions

- **No comments** - Code should be self-documenting
- **Functional components** with hooks
- **Props destructuring** in component parameters
- **Tailwind classes** for all styling
- **Event handlers** prefixed with `on` (onNavigateMonth, onSelectDate)

## State Management

- **Local state** with useState hooks
- **Event storage** in component state (could be enhanced with localStorage)
- **Date formatting** via `formatDateKey()` helper functions

## Responsive Design

- **Mobile-first** approach
- **Max-width container** (max-w-md mx-auto)
- **Sticky header** for navigation
- **Touch-friendly** button sizes

## Testing

- Run `npm run build` to verify no TypeScript/build errors
- Check `npm run dev` starts successfully on port 5173
- Verify Hebrew calendar navigation works correctly

## Recent Changes

- Refactored from single 260-line component to 7 smaller components
- Integrated @hebcal/core for accurate Hebrew calendar calculations
- Added Hebrew month names and year display
- Implemented proper Hebrew date navigation and event management

## Known Issues

None currently. The application builds and runs successfully.

## Future Enhancements

- Add localStorage for event persistence
- Implement Hebrew/English language toggle
- Add holiday display integration
- Enhanced mobile PWA features