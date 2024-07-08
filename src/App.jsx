import React, { useState } from 'react'
import Header from './Components/Header'
import CategoryFilter from './Components/CategoryFilter'
import MovieList from './Components/MovieList'
import DateContext from './DateContext'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);

  return (
    <>
    <DateContext.Provider value={currentYear}>
      <Header />
      <CategoryFilter userSelectedGenre={setMovies}/>
      <MovieList movies={movies} />
    </DateContext.Provider>
    </>
  )
}

export default App
