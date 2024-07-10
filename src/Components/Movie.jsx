import React, { useState, useEffect } from 'react';
import { fetchMovieDetails, fetchMovieCredits } from '../utils/tmdbAPI';
const Movie = (props) => {
    //  Each movie which is in the form of an object is being passed as props
    const [details, setDetails] = useState(null);
    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState(null);
    const [releaseYear, setReleaseYear] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () => {
            const movieDetails = await fetchMovieDetails(props.movie.id);
            setDetails(movieDetails);

            //fetches release year
            const movieYear = movieDetails.release_date.slice(0,4);
            setReleaseYear(movieYear ? movieYear : 'Unknown');

            //fetches movie credits including cast and crew
            const movieData = await fetchMovieCredits(props.movie.id);

            //Movie Cast
            const movieCast = movieData.cast;
            setCast(movieCast.slice(0, 5)); // Display top 5 cast members

            //Movie Director
            const movieDirector = movieData.crew.find(crewMember => crewMember.job === 'Director');
            //movieDirector would be an object as movieData.crew is an array of objects
            setDirector(movieDirector ? movieDirector.name : 'Unknown');

        };

        getMovieDetails();
    }, [props.movie.id]);

    return (

        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt={props.movie.title} className="movie-card-image" />
            <div className="movie-card-content">
                <h2 className="movie-card-title">{props.movie.title}</h2>
                <p className="movie-card-release-year">{releaseYear}</p>
                {details && (
                    <p className="movie-card-genres">{details.genres.map(genre => genre.name).join(', ')}</p>
                )}
                <p className="movie-card-overview">{props.movie.overview}</p>
                <p className="movie-card-director">Directed By: {director}</p>
                <p className="movie-card-cast">Cast: {cast.map(actor => (actor.name)).join(', ')}</p>
            </div>
        </div>

    );

};

export default Movie;
