import React, { lazy, Suspense, useEffect, useRef, useContext } from 'react';
import MovieContext from '../MovieContext';
const Movie = lazy(() => import('./Movie'));

const MovieList = () => {
  const { movies } = useContext(MovieContext);
  const listRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (listRef.current) {
  //       const { scrollTop, scrollHeight, clientHeight } = listRef.current;
  //       if (scrollTop + clientHeight >= scrollHeight - 100) {
  //         loadMoreMovies('down');
  //       } else if (scrollTop === 0) {
  //         loadMoreMovies('up');
  //       }
  //     }
  //   };

  //   const listNode = listRef.current;
  //   listNode.addEventListener('scroll', handleScroll);
  //   return () => {
  //     listNode.removeEventListener('scroll', handleScroll);
  //   };
  // }, [loadMoreMovies]);

  // props.movies is an array of objects, each object is a movie
  return (
    <div className="movies-container" ref={listRef}>
      {movies.map((movie) => (
        <Suspense fallback={<div>Loading...</div>} key={movie.id}>
          <Movie key={movie.id} movie={movie} />
        </Suspense>
      ))}
    </div>
  );
};

export default MovieList;
