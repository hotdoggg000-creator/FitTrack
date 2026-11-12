
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ExerciseDetails from "./pages/ExerciseDetails";
import "./App.css";

function App() {
  // Load saved favorites when the application starts
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("fittrack-favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Could not load favorites:", error);
      return [];
    }
  });

  // Keep favorites saved in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "fittrack-favorites",
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Could not save favorites:", error);
    }
  }, [favorites]);

  // Add or remove an exercise from favorites
  function toggleFavorite(exercise) {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (item) => item.id === exercise.id
      );

      if (alreadySaved) {
        return currentFavorites.filter(
          (item) => item.id !== exercise.id
        );
      }

      return [...currentFavorites, exercise];
    });
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/exercises/:id"
          element={<ExerciseDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
