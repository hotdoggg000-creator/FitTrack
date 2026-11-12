
const API_URL = "https://wger.de/api/v2";

export async function getExercises() {
  let nextUrl = `${API_URL}/exerciseinfo/?language=2&limit=100`;
  const allExercises = [];

  while (nextUrl) {
    const response = await fetch(nextUrl);

    if (!response.ok) {
      throw new Error("Failed to load exercises. Please try again.");
    }

    const data = await response.json();

    allExercises.push(...data.results);

    nextUrl = data.next;
  }

  return allExercises;
}
