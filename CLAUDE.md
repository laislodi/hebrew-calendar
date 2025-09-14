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
- **Vitest 3.2.4** - Testing framework
- **@testing-library/react 16.3.0** - Component testing utilities
- **@testing-library/jest-dom 6.8.0** - Custom Jest matchers

## Project Structure

```
src/
├── components/
│   ├── Calendar.jsx                    # Main calendar container (99 lines)
│   ├── CalendarHeader.jsx              # Header with navigation and date display
│   ├── CalendarGrid.jsx                # Calendar grid with Hebrew date logic
│   ├── CalendarDay.jsx                 # Individual day cell component
│   ├── EventsPanel.jsx                 # Events section container
│   ├── EventForm.jsx                   # Form for adding new events
│   ├── EventList.jsx                   # List of events for selected date
│   ├── EventItem.jsx                   # Individual event item display
│   ├── CalendarHeader.test.jsx         # CalendarHeader component tests
│   ├── CalendarDay.test.jsx            # CalendarDay component tests
│   ├── EventForm.test.jsx              # EventForm component tests
│   ├── EventItem.test.jsx              # EventItem component tests
│   └── Calendar.integration.test.jsx   # Integration tests for Calendar
├── App.jsx                             # App entry point
├── main.jsx                            # React DOM render
├── index.css                           # Global styles with Tailwind directives
└── setupTests.js                       # Test configuration file
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
npm run test         # Run test suite with Vitest
npm ci               # Clean install dependencies
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

### Test Suite Overview
- **5 test files** with **44 tests** - All passing ✅
- **Vitest** with React Testing Library
- **Component unit tests** - Individual component functionality
- **Integration tests** - Components working together
- **Accessibility tests** - ARIA labels and keyboard navigation

### Test Files
1. **CalendarHeader.test.jsx** (6 tests) - Navigation buttons, month display, date formatting
2. **CalendarDay.test.jsx** (9 tests) - Day rendering, states (today/selected), event indicators
3. **EventForm.test.jsx** (13 tests) - Form inputs, validation, event creation
4. **EventItem.test.jsx** (9 tests) - Event display, removal functionality
5. **Calendar.integration.test.jsx** (7 tests) - Full app workflow, event management

### Running Tests
```bash
npm test                    # Run all tests
npm test -- --watch        # Run tests in watch mode
npm test -- CalendarDay    # Run specific test file
```

### Test Coverage
- ✅ Component rendering and props
- ✅ User interactions (clicks, form submissions)
- ✅ Event management (create, display, remove)
- ✅ Hebrew calendar functionality
- ✅ Accessibility features
- ✅ Responsive design classes

## Recent Changes

- **Component Refactoring** - Broke down 260-line component into 7 focused components
- **Hebrew Calendar Integration** - Replaced simple date logic with @hebcal/core HDate
- **Comprehensive Test Suite** - Added 44 tests across 5 test files with 100% pass rate
- **Accessibility Improvements** - Added aria-labels for screen readers
- **Hebrew Month Display** - Proper Hebrew month names (תשרי, חשון, etc.) and years (5785)
- **Tailwind CSS Integration** - Added proper directives and configuration

## Current Status

✅ **All systems operational**
- Application builds successfully
- Development server runs on localhost:5173
- All 44 tests passing
- No lint errors
- Hebrew calendar functionality working correctly

## Future Enhancements

- **Event Persistence** - Add localStorage to save events between sessions
- **Language Toggle** - Hebrew/English interface switching
- **Holiday Integration** - Display Jewish holidays using @hebcal/core
- **PWA Features** - Service worker, manifest.json for mobile installation
- **Export Functionality** - Export events to calendar formats (iCal, Google Calendar)
- **Theme Support** - Dark mode toggle
- **Performance** - Lazy loading and memoization optimizations

## Troubleshooting

### Common Issues
1. **Tests failing** - Run `npm ci` to clean install dependencies
2. **Build errors** - Check for TypeScript/ESLint errors with `npm run lint`
3. **Dev server issues** - Ensure port 5173 is available or kill existing processes
4. **Hebrew text display** - Verify UTF-8 encoding and proper font support

### Debug Commands
```bash
npm run build --verbose    # Detailed build output
npm test -- --reporter=verbose  # Detailed test output
npm run dev --host         # Expose dev server to network
```