import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import star from "../assets/star.svg";
import LoadingPage from "../components/Loading";

const TvShowCard = ({ searchInput = "" }) => {
  const [tvShow, setTvShow] = useState([]);
  const [searchedTvShow, setSearchedTvShow] = useState(
    JSON.parse(localStorage.getItem("searchedTvShow")) || []
  );

  const [loading, setLoading] = useState(true);
  const defaultTvApi =
    "https://api.themoviedb.org/3/discover/tv?api_key=f2db34f2c291500db37a87ab83ea5545";

  useEffect(() => {
    const fetchDataTimeout = () => {
      setTimeout(() => {
        fetch(defaultTvApi)
          .then((res) => res.json())
          .then((data) => {
            setTvShow(data.results);
            setLoading(false);
          });
      }, 500);
    };
    fetchDataTimeout();
  }, []);

  const API_KEY = "f2db34f2c291500db37a87ab83ea5545";
  const BASE_URL = "https://api.themoviedb.org/3/search/tv";

  useEffect(() => {
    localStorage.setItem("searchedTvShow", JSON.stringify(searchedTvShow));
    setLoading(true);
    const fetchDataTimeout = () => {
      setTimeout(() => {
        fetch(`${BASE_URL}?api_key=${API_KEY}&query=${searchInput}`)
          .then((res) => res.json())
          .then((data) => {
            setSearchedTvShow(data.results);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      }, 500);
    };
    fetchDataTimeout();
  }, [searchInput, BASE_URL, API_KEY]);

  const displayTvShow = searchedTvShow.length ? searchedTvShow : tvShow;

  const tvShowElaments = displayTvShow.map((tv) => (
    <Link to={`${tv.id}`} className="movie-card" key={tv.id}>
      <button>
        <img src={star} alt={tv.title} /> <p>{tv.vote_average}</p>
      </button>
      <div className="image-name">
        <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} alt="" />
        <h2>{tv.name}</h2>
      </div>
    </Link>
  ));

  return (
    <div className="all-movie">
      <div className="texts">
        <h1>Tv Shows</h1>
        <h2>({tvShow.length})</h2>
      </div>

      <div className="movie-card-container">
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="card">{tvShowElaments}</div>
        )}
      </div>
    </div>
  );
};

export default TvShowCard;
