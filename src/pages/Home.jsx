
import { useEffect, useState } from "react";
import { getExercises } from "../services/exerciseService";
import ExerciseCard from "../components/ExerciseCard";
import { Search, SlidersHorizontal } from "lucide-react";

const EXERCISES_PER_PAGE = 12;

function getExerciseName(exercise) {
  const translation =
    exercise.translations?.find((item) => item.language === 2) ||
    exercise.translations?.[0];

  return translation?.name || "";
}

function getRelatedNames(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) =>
      typeof item === "string" ? item : item?.name
    )
    .filter(Boolean);
}

function Home({ favorites, toggleFavorite }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch all exercises when the page first loads
  useEffect(() => {
    async function loadExercises() {
      try {
        setLoading(true);
        setError("");

        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadExercises();
  }, [retryCount]);

  // Get available muscle groups and equipment from all exercises
  const muscleOptions = [
    ...new Set(
      exercises.flatMap((exercise) =>
        getRelatedNames(exercise.muscles)
      )
    ),
  ].sort();

  const equipmentOptions = [
    ...new Set(
      exercises.flatMap((exercise) =>
        getRelatedNames(exercise.equipment)
      )
    ),
  ].sort();

  // Search and filter across the complete exercise collection
  const filteredExercises = exercises.filter((exercise) => {
    const name = getExerciseName(exercise).toLowerCase();

    const muscles = getRelatedNames(exercise.muscles);
    const equipment = getRelatedNames(exercise.equipment);

    const matchesSearch = name.includes(searchTerm.toLowerCase());

    const matchesMuscle =
      selectedMuscle === "all" ||
      muscles.includes(selectedMuscle);

    const matchesEquipment =
      selectedEquipment === "all" ||
      equipment.includes(selectedEquipment);

    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  // Calculate pagination from the filtered results
  const totalPages = Math.max(
    1,
    Math.ceil(filteredExercises.length / EXERCISES_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * EXERCISES_PER_PAGE;

  const displayedExercises = filteredExercises.slice(
    startIndex,
    startIndex + EXERCISES_PER_PAGE
  );

  // Return to page 1 whenever search or filters change
  function handleSearchChange(value) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleMuscleChange(value) {
    setSelectedMuscle(value);
    setCurrentPage(1);
  }

  function handleEquipmentChange(value) {
    setSelectedEquipment(value);
    setCurrentPage(1);
  }

  function changePage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="page-container">
      <section className="hero">
        <p className="eyebrow">
          YOUR FITNESS JOURNEY STARTS HERE
        </p>

        <h1>Discover Your Next Workout.</h1>

        <p>
          Explore exercises, learn new movements, and build
          a stronger version of yourself.
        </p>
      </section>

      <section className="content-section">
        <h2>Explore Exercises</h2>

        <p className="section-subtitle">
          Discover exercises to help you reach your fitness goals.
        </p>

        <div className="search-container">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(event) =>
              handleSearchChange(event.target.value)
            }
          />
        </div>

        <div className="filter-container">
          <div className="filter-heading">
            <SlidersHorizontal size={18} />
            <span>Filter Exercises</span>
          </div>

          <div className="filter-controls">
            <select
              value={selectedMuscle}
              onChange={(event) =>
                handleMuscleChange(event.target.value)
              }
            >
              <option value="all">All Muscle Groups</option>

              {muscleOptions.map((muscle) => (
                <option key={muscle} value={muscle}>
                  {muscle}
                </option>
              ))}
            </select>

            <select
              value={selectedEquipment}
              onChange={(event) =>
                handleEquipmentChange(event.target.value)
              }
            >
              <option value="all">All Equipment</option>

              {equipmentOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button
              className="clear-filters"
              onClick={() => {
                setSelectedMuscle("all");
                setSelectedEquipment("all");
                setSearchTerm("");
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {loading && (
          <p className="status-message">
            Loading exercises. This may take a little longer...
          </p>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setRetryCount((count) => count + 1)}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="results-count">
              Showing {displayedExercises.length} of{" "}
              {filteredExercises.length} matching exercises
              {" "}— Page {currentPage} of {totalPages}
            </p>

            {filteredExercises.length === 0 ? (
              <p className="status-message">
                No exercises found. Try changing your search or filters.
              </p>
            ) : (
              <div className="exercise-grid">
                {displayedExercises.map((exercise) => (
                  <ExerciseCard
  key={exercise.id}
  exercise={exercise}
  isFavorite={favorites.some((item) => item.id === exercise.id)}
  toggleFavorite={toggleFavorite}
/>
                ))}
              </div>
            )}

            <div className="pagination">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Home;
