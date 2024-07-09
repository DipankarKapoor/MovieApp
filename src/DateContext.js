import { createContext } from 'react';

// Create a context object
const DateContext = createContext({
    currentYear: 2012,
    setCurrentYear: () => {},
  });

export default DateContext;

