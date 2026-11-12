import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://wger.de/api/v2";

function ExerciseDetails() {
  const { id } = useParams();

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    async function loadExercise() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/exerciseinfo/${id}/`
        );

        if (!response.ok) {
          throw new Error("Failed to load exercise details.");
        }

        const data = await response.json();
        setExercise(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadExercise();
  }, [id, retryCount]);

  const translation =
    exercise?.translations?.find(
      (item) => item.language === 2
    ) || exercise?.translations?.[0];

  const name = translation?.name || "Unnamed Exercise";

  const description = translation?.description
    ? translation.description.replace(/<[^>]*>/g, "").trim()
    : "No description available for this exercise.";

  const image = exercise?.images?.[0]?.image;

  const muscles = exercise?.muscles || [];
  const equipment = exercise?.equipment || [];

  if (loading) {
    return (
      <main className="page-container">
        <p className="status-message">
          Loading exercise details...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="error-message">
          <p>{error}</p>

          <button
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!exercise) {
    return (
      <main className="page-container">
        <p className="status-message">
          Exercise not found.
        </p>
      </main>
    );
  }

  return (
    <main className="page-container">
      <section className="content-section">
        <Link to="/" className="back-link">
          ← Back to Exercises
        </Link>

        <div className="details-container">
          <div className="details-image-wrapper">
            {image ? (
              <img
                src={image}
                alt={name}
                className="details-image"
              />
            ) : (
              <div className="details-placeholder">
                💪
              </div>
            )}
          </div>

          <div className="details-info">
            <h1>{name}</h1>

            <h2>Exercise Description</h2>
            <p>{description}</p>

            <h2>Muscle Groups</h2>
            {muscles.length > 0 ? (
              <div className="details-tags">
                {muscles.map((muscle) => (
                  <span key={muscle.id}>
                    {muscle.name}
                  </span>
                ))}
              </div>
            ) : (
              <p>No muscle group information available.</p>
            )}

            <h2>Equipment</h2>
            {equipment.length > 0 ? (
              <div className="details-tags">
                {equipment.map((item) => (
                  <span key={item.id}>
                    {item.name}
                  </span>
                ))}
              </div>
            ) : (
              <p>No equipment information available.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ExerciseDetails;