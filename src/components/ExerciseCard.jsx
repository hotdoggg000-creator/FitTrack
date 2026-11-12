
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function ExerciseCard({ exercise, isFavorite, toggleFavorite }) {
  // Get the English translation, or use the first available translation
  const translation =
    exercise.translations?.find((item) => item.language === 2) ||
    exercise.translations?.[0];

  const name = translation?.name || "Unnamed Exercise";

  const description = translation?.description
    ? translation.description.replace(/<[^>]*>/g, "").trim()
    : "Explore this exercise and learn how to perform it.";

  const image = exercise.images?.[0]?.image;

  return (
    <article className="exercise-card">
      <div className="exercise-card-image-wrapper">
        {image ? (
          <img
            src={image}
            alt={name}
            className="exercise-image"
          />
        ) : (
          <div className="exercise-placeholder">💪</div>
        )}

        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={() => toggleFavorite(exercise)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          title={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            size={21}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="exercise-info">
        <h3>
  <Link to={`/exercises/${exercise.id}`}>
    {name}
  </Link>
</h3>

        <p>{description || "No description available."}</p>

        <span className="exercise-category">
          {exercise.category?.name || "General Exercise"}
        </span>
      </div>
    </article>
  );
}

export default ExerciseCard;
