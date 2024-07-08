import React, { lazy, Suspense, useState, useEffect, useContext } from 'react';
import { fetchMovies } from '../utils/tmdbAPI';
import MovieContext from '../MovieContext';
import DateContext from '../DateContext.js';
import GenreContext from '../GenreContext.js';
const Movie = lazy(() => import('./Movie'));

const MovieList = () => {
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  //getting key error here after 2015, solve problem of not retaining state when we shift genres. 
  const { selectedGenre } = useContext(GenreContext);
  const { movies, setMovies } = useContext(MovieContext);
  const { currentYear, setCurrentYear } = useContext(DateContext);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log("mounted scroll event listener")
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("Mounted second useeffect this increments year and loads movies")
    const loadMovies = async () => { 
      setCurrentYear(prevYear => prevYear + 1);
      console.log(currentYear);
      const newMovies = await fetchMovies(currentYear, selectedGenre);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      console.log(movies)
    };

    loadMovies();
  }, [page]);

  // props.movies is an array of objects, each object is a movie
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <Suspense fallback={<div>Loading...</div>} key={movie.id}>
          <Movie key={movie.id} movie={movie} />
        </Suspense>
      ))}
    </div>
  );
};

export default MovieList;
