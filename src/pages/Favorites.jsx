import ExerciseCard from "../components/ExerciseCard";

function Favorites({ favorites, toggleFavorite }) {
  return (
    <main className="page-container">
      <section className="content-section">
        <h1>My Favorite Exercises ❤️</h1>

        <p className="section-subtitle">
          Your saved exercises are all in one place.
        </p>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <span>💜</span>
            <h2>No favorites yet</h2>
            <p>
              Browse the exercises and click the heart button
              to save your favorites.
            </p>
            <div>
              <h1>
                clcik the heart <button></button>
              </h1>
            </div>
          </div>
        ) : (
          <>
            <p className="results-count">
              You have saved {favorites.length} exercise
              {favorites.length !== 1 ? "s" : ""}.
            </p>

            <div className="exercise-grid">
              {favorites.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isFavorite={true}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Favorites;