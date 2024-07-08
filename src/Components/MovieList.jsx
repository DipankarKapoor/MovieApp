import React , {lazy, Suspense} from 'react';
// import Movie from './Movie';
const Movie = lazy(() => import('./Movie'));
const MovieList = (props) => {

    // props.movies is an array of objects, each object is a movie
  return (
    <div className="movies-container">
      {props.movies.map((movie) => (
        <Suspense fallback={<div>Loading...</div>} key={movie.id}>
        <Movie key={movie.id} movie={movie} />
        </Suspense>
      ))}
    </div>
  );
};

export default MovieList;
