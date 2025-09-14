# Hebrew Calendar

A React application for displaying and managing Hebrew calendar dates, built with modern web technologies.

## Features

- ✅ Hebrew months displayed (Av 5785 instead of January 2025)
- ✅ Accurate Hebrew calendar calculations (29/30 day months)
- ✅ Proper date conversions between Hebrew and Gregorian
- ✅ Hebrew year numbering (5785 instead of 2025)
- ✅ Month navigation respects Hebrew calendar structure
- ✅ Modern, responsive UI built with React and Tailwind CSS
- ✅ Fast development experience with Vite

## Tech Stack

- **React 19.1.1** - Modern UI library with latest features: [Docs](https://react.dev/learn)
- **Vite 4.4.5** - Fast build tool and development server: [Docs](https://vite.dev/guide/)
- **Tailwind CSS 3.3.3** - Utility-first CSS framework for styling: [Documentation](https://tailwindcss.com/docs/installation/using-vite)
- **Lucide React** - Beautiful icon library: [Docs](https://lucide.dev/guide/packages/lucide-react)
- **ESLint** - Code linting and quality assurance: [Docs](https://eslint.org/docs/latest/)
- **Hebcal** - Perpetual Jewish Calendar library: [Docs](https://hebcal.github.io/api/core/index.html)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hebrew-calendar
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
hebrew-calendar/
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # React components
│   ├── App.jsx      # Main application component
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles with Tailwind
├── index.html       # HTML template
└── package.json     # Project dependencies and scripts
```

## Development

This project uses:
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **ESLint** for code quality and consistency
- **Hot Module Replacement (HMR)** for instant updates during development

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and not licensed for public use.
