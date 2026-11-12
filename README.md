# FitTrack – Fitness & Workout Explorer

## Project Overview

FitTrack is a React-based fitness and workout explorer that allows users to discover exercises, search and filter workouts, view exercise details, and save their favorite exercises.

The application uses the public wger REST API to retrieve exercise information and provides a responsive interface with a premium dark fitness theme.

## Features

- Browse exercises from the wger API.
- Search exercises by keyword.
- Filter exercises by muscle group and equipment.
- Navigate through exercises using pagination.
- View detailed exercise information.
- Add and remove favorite exercises.
- Save favorites using browser localStorage.
- Responsive design for desktop and mobile devices.
- Loading indicators and error handling with retry options.

## Technologies Used

- React
- Vite
- JavaScript
- React Router
- CSS
- Lucide React
- Browser localStorage
- Git and GitHub

## API Source

This project uses the public wger Exercise API.

- API: https://wger.de/api/v2/
- API Documentation: https://wger.de/en/software/api

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hotdoggg000-creator/FitTrack.git
   ```

2. Navigate to the project folder:

   ```bash
   cd FitTrack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal.

## Environment Variables

FitTrack currently uses the public wger API and does not require an API key or environment variables.

## Project Structure

```text
src/
├── components/
│   ├── ExerciseCard.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── ExerciseDetails.jsx
│   └── Favorites.jsx
├── services/
│   └── exerciseService.js
├── App.jsx
├── App.css
└── main.jsx
```

## Team Contributions

This project is developed individually as a course project. The project implementation, interface design, API integration, testing, and documentation are handled by the project developer.

## Running the Project

Use `npm run dev` to start the local development server.

---

**FitTrack – Fitness & Workout Explorer**