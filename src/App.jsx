import React, { useState } from 'react'
import Header from './Components/Header'
import CategoryFilter from './Components/CategoryFilter'
import MovieList from './Components/MovieList'
import './App.css'


function App() {
  const [movies, setMovies] = useState([]);

  return (
    <>
      <Header />
      <CategoryFilter userSelectedGenre={setMovies}/>
      <MovieList movies={movies} />
    </>
  )
}

export default App
