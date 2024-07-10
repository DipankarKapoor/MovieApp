import React, { useState } from 'react'
import Header from './Components/Header'
import CategoryFilter from './Components/CategoryFilter'
import MovieList from './Components/MovieList'
import DateContext from './Context/DateContext'
import MovieContext from './Context/MovieContext'
import GenreContext from './Context/GenreContext'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <>
      <DateContext.Provider value={{ currentYear, setCurrentYear }}>
        <Header />
        <MovieContext.Provider value={{ movies, setMovies }}>
          <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
            <CategoryFilter />
            <MovieList />
          </GenreContext.Provider>
        </MovieContext.Provider>
      </DateContext.Provider>
    </>
  )
}

export default App
