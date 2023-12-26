import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import star from "../assets/star.svg";
import backArrow from "../assets/arrow-right.svg";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [genre, setGenre] = useState([]);
  const [teaserVideo, setTeaserVideo] = useState(null);

  const API_KEY = "f2db34f2c291500db37a87ab83ea5545";
  const defaultApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const movieVideosApi = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(movieVideosApi)
      .then((res) => res.json())
      .then((data) => {
        console.log("Teaser Video Data:", data);
        setTeaserVideo(data);
      })
      .catch((error) => {
        console.error("Error fetching teaser video:", error);
      });
  }, [id]);

  const teaserVideoUrl = `https://www.youtube.com/watch?v=${teaserVideo}`;

  useEffect(() => {
    fetch(defaultApi)
      .then((res) => res.json())
      .then((movie) => setMovieDetails(movie));
  }, [id]);

  useEffect(() => {
    fetch(defaultApi)
      .then((res) => res.json())
      .then((movie) => setGenre(movie.genres));
  }, [id]);

  const genreEl = genre.map((item, index) => (
    <React.Fragment key={index}>
      <h3>{`${item.name}`}</h3>
      {index < genre.length - 1 && `,`}
    </React.Fragment>
  ));

  return (
    <div className="movie-detaials-container">
      <Link className="back-nav" to="..">
        <img src={backArrow} alt="backarrow" />
        <h5>Back to Movies</h5>
      </Link>
      <img
        className="backdrop"
        src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
        alt=""
      />
      <div>
        <h1>{movieDetails.title}</h1>
      </div>

      <div className="detail-part">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt=""
        />

        <div className="detail-text">
          <h2>{movieDetails.tagline}</h2>
          <p>{movieDetails.overview}</p>

          <div className="rating">
            <img
              style={{ width: "15px", height: "15px" }}
              src={star}
              alt={movieDetails.title}
            />
            <h3>{movieDetails.vote_average}</h3>
          </div>

          <div className="release-date">
            <h4>Release Date : </h4>
            <h3>{movieDetails.release_date}</h3>
          </div>

          <div>
            <h4>Run Time : </h4>
            <h3>{movieDetails.runtime} min</h3>
          </div>

          <div className="genre-el">
            <h4>Genres: </h4>
            <div className="genre">{genreEl}</div>
          </div>
        </div>
      </div>
      {teaserVideo && teaserVideo.results.length > 0 && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${teaserVideo.results[0].key}`}
          title="Teaser Video"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default MovieDetails;
