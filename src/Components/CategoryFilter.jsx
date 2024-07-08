import React, { useState, useEffect, useContext } from 'react'
import { fetchGenres, fetchMovies } from '../utils/tmdbAPI';
import DateContext from '../DateContext.js';
import MovieContext from '../MovieContext.js';
import GenreContext from '../GenreContext.js';

const CategoryFilter = () => {
  const [genres, setGenres] = useState([]);
  const {selectedGenre, setSelectedGenre}= useContext(GenreContext);
  const { currentYear, setCurrentYear } = useContext(DateContext);
  const { setMovies } = useContext(MovieContext);

  useEffect(() => {
    //fetches genre from the API and sets it to the state
    const getGenres = async () => {
      const genres = await fetchGenres();
      setGenres(genres);
      //Load the first genre by default with date 2012
      setSelectedGenre(genres[0].id);
      const defaultMovieList = await fetchMovies(currentYear, genres[0].id);
      setMovies(defaultMovieList);
    };
    getGenres();
  }, []);

  // Handles the genre click
  const handleGenreClick = async (genreId) => {
    setSelectedGenre(genreId);
    // setCurrentYear(2012);
    const newMoviesFetched = await fetchMovies(currentYear, genreId);
    setMovies(newMoviesFetched);
  };

  return (
    <div className='category-filter'>
      {genres.map((genre) => (
        <button
          className="category-button"
          key={genre.id}
          onClick={() => handleGenreClick(genre.id)}
          style={{
            backgroundColor: selectedGenre === genre.id ? 'rgb(255 0 0)' : '#130b0b',
            color: 'white',
            margin: '5px',
            padding: '10px',
            border: 'none',
            borderRadius: '20px'
          }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter
