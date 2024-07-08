import React, {useState, useEffect} from 'react'
import { fetchGenres, fetchMovies } from '../utils/tmdbAPI';
const CategoryFilter = (props) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    
    useEffect(() => {
      //fetches genre from the API and sets it to the state
        const getGenres = async () => {
        const genres = await fetchGenres();
        setGenres(genres);

        //Load the first genre by default with date 2012
        setSelectedGenre(genres[0].id);
        const defaultMovieList = await fetchMovies(2012, genres[0].id);
        props.userSelectedGenre(defaultMovieList);
      };
      getGenres();
    }, []);
  
    // Handles the genre click
    const handleGenreClick = async (genreId) => {
      setSelectedGenre(genreId);
      const movies = await fetchMovies(2012, genreId);
      props.userSelectedGenre(movies);
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
