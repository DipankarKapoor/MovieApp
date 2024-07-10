import React, { lazy, Suspense, useContext } from 'react';
import { fetchMovies } from '../utils/tmdbAPI';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieContext from '../Context/MovieContext';
import DateContext from '../Context/DateContext.js';
import GenreContext from '../Context/GenreContext.js';
const Movie = lazy(() => import('./Movie'));

const MovieList = () => {
  const { selectedGenre } = useContext(GenreContext);
  const { movies, setMovies } = useContext(MovieContext);
  const { currentYear, setCurrentYear } = useContext(DateContext);

  const fetchMoreData = async () => {
    setCurrentYear(prevYear => prevYear + 1);
    //Have to add currentYear+1 as state isn't updated immediately
    const newMovies = await fetchMovies(currentYear + 1, selectedGenre);
    setMovies((prevMovies) => {
      // Filter out any duplicates by checking movie IDs
      const newMovieIDs = newMovies.map(movie => movie.id);
      const filteredPrevMovies = prevMovies.filter(movie => !newMovieIDs.includes(movie.id));
      return [...filteredPrevMovies, ...newMovies];
    });
  };

  // props.movies is an array of objects, each object is a movie
  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={fetchMoreData}
      hasMore={currentYear < new Date().getFullYear()}
      loader={<h4>Loading...</h4>}
    >
      <div className="movies-container">
        {movies.map((movie) => (
          <Suspense fallback={<div>Loading...</div>} key={movie.id}>
            <Movie key={movie.id} movie={movie} />
          </Suspense>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default MovieList
