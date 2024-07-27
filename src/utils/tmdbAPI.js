const API_KEY = '';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?language=en&api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres; //returns an array of objects
};

export const fetchMovies = async (year, genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&vote_count.gte=100&with_genres=${genreId}`
  );
  const data = await response.json();
  // console.log(data)
  return data.results.slice(0, 20); // Limit to 20 movies per request
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  // console.log(data);
  return data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  // console.log(data)
  return data; //returns an object with keys id, cast and crew
};
