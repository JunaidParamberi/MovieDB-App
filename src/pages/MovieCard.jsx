import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import star from "../assets/star.svg";
import LoadingPage from "../components/Loading";

const MovieCard = ({ searchInput = "" }) => {
  const defaultApi =
    "https://api.themoviedb.org/3/discover/movie?api_key=f2db34f2c291500db37a87ab83ea5545";

  const [defaultMovie, setDefaultMovie] = useState([]);
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataWithDelay = () => {
      setTimeout(() => {
        fetch(defaultApi)
          .then((response) => response.json())
          .then((data) => {
            setDefaultMovie(data.results);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      }, 500);
    };

    fetchDataWithDelay();
  }, [defaultApi]);

  const displayMovies = movies.length ? movies : defaultMovie;

  const movieElaments = displayMovies.map((movie) => (
    <Link to={`/${movie.id}`} className="movie-card" key={movie.id}>
      <button>
        <img src={star} alt={movie.title} /> <p>{movie.vote_average}</p>
      </button>
      <div className="image-name">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
        <h2>{movie.title}</h2>
      </div>
    </Link>
  ));
  const API_KEY = "f2db34f2c291500db37a87ab83ea5545";
  const BASE_URL = "https://api.themoviedb.org/3/search/movie";

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
    setLoading(true);

    const fetchWithDelay = () => {
      setTimeout(() => {
        fetch(`${BASE_URL}?api_key=${API_KEY}&query=${searchInput}`)
          .then((res) => res.json())
          .then((data) => {
            setMovies(data.results);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      }, 500);
    };

    fetchWithDelay();
  }, [searchInput, BASE_URL, API_KEY]);

  return (
    <div className="all-movie">
      <div className="texts">
        <h1>Movies</h1>
        <h2>({defaultMovie.length})</h2>
      </div>

      <div className="movie-card-container">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="card">{movieElaments}</div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
