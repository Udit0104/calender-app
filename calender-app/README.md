# Calendar App

A React calendar application built with Vite and Tailwind CSS. The app displays a monthly calendar grid, allows navigation between months, and highlights the current day.

## Project Overview

- Framework: `React`
- Bundler / dev server: `Vite`
- Styling: `Tailwind CSS` via `@tailwindcss/vite`
- Date utilities: `date-fns`
- Linting: `ESLint`

## Features

- Month navigation with previous/next buttons
- Calendar grid with days from the current month
- Faded display for non-current month days
- Highlight for today's date
- Responsive card layout with Tailwind styling

## Installation

1. Open a terminal in the project folder:

```bash
cd "e:/Projects/TUF Assignment/calender-app"
```

2. Install dependencies:

```bash
npm install
```

## Running Locally

Start the Vite development server:

```bash
npm run dev
```

Then open the URL shown in the terminal, typically:

```text
http://localhost:5173/
```

## Build for Production

Run the production build command:

```bash
npm run build
```

The built files are generated in the `dist/` folder.

## Preview Production Build

After building, preview the production output locally:

```bash
npm run preview
```

## Linting

Run ESLint to check the project files:

```bash
npm run lint
```

## Project Structure

- `index.html` — main HTML template
- `src/main.jsx` — application entry point
- `src/App.jsx` — main calendar component
- `src/App.css` — Tailwind CSS import and custom styles
- `package.json` — dependencies and scripts
- `vite.config.js` — Vite configuration

## Dependencies Used

### Runtime dependencies

- `react` — UI library
- `react-dom` — React DOM renderer
- `tailwindcss` — utility-first CSS framework
- `@tailwindcss/vite` — Vite plugin for Tailwind CSS integration
- `date-fns` — date utility library

### Development dependencies

- `vite` — frontend build tool and dev server
- `@vitejs/plugin-react` — React plugin for Vite
- `eslint` — JavaScript linter
- `@eslint/js` — ESLint core rules package
- `eslint-plugin-react-hooks` — lint rules for React Hooks
- `eslint-plugin-react-refresh` — React Fast Refresh lint support
- `globals` — predefined global variable definitions
- `@types/react` — React type definitions (for editor support)
- `@types/react-dom` — React DOM type definitions (for editor support)

## Notes

- This project uses Tailwind CSS classes directly in `src/App.jsx` for styling.
- If you want to customize Tailwind further, you can add a `tailwind.config.js` file and extend the theme.

## Recommended Environment

- Node.js `16.8+` (Node.js `18+` recommended)
- npm `9+`

---

Thank you for using this calendar app! Feel free to modify `src/App.jsx` and `src/App.css` to extend the calendar features.