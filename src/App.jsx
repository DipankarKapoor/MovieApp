import React, { useState } from 'react'
import Header from './Components/Header'
import CategoryFilter from './Components/CategoryFilter'
import MovieList from './Components/MovieList'
import DateContext from './DateContext'
import MovieContext from './MovieContext'
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [currentYear, setCurrentYear] = useState(2012);

  return (
    <>
      <DateContext.Provider value={{ currentYear, setCurrentYear }}>
        <Header />
        <MovieContext.Provider value={{ movies, setMovies }}>
          <CategoryFilter />
          <MovieList />
        </MovieContext.Provider>
      </DateContext.Provider>
    </>
  )
}

export default App
