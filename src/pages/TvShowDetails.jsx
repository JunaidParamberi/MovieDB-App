import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import star from "../assets/star.svg";
import backArrow from "../assets/arrow-right.svg";
function TvShowDetails() {
  const { id } = useParams();
  const [tvDetails, setTvDetails] = useState({});
  const [genre, setGenre] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [tvVideo, setTvVideo] = useState(null);
  const API_KEY = "f2db34f2c291500db37a87ab83ea5545";
  const defaultTvApi = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
  const tvVideosApi = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    fetch(tvVideosApi)
      .then((res) => res.json())
      .then((data) => {
        console.log("Teaser Video Data :", data);
        setTvVideo(data);
      })
      .catch((error) => {
        console.error("Error fetching teaser video:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch(defaultTvApi)
      .then((res) => res.json())
      .then((data) => setTvDetails(data));
  }, [id]);

  useEffect(() => {
    fetch(defaultTvApi)
      .then((res) => res.json())
      .then((tv) => setGenre(tv.genres));
  }, [id]);

  useEffect(() => {
    fetch(defaultTvApi)
      .then((res) => res.json())
      .then((tv) => setSeasons(tv.seasons));
  }, [id]);

  const genreEl = genre.map((item, index) => (
    <React.Fragment key={index}>
      <h3>{`${item.name}`}</h3>
      {index < genre.length - 1 && `,`}
    </React.Fragment>
  ));

  return (
    <div className="movie-detaials-container">
      <Link className="back-nav" to=".." relative="path">
        <img src={backArrow} alt="backarrow" />
        <h5>Back to Tv Shows</h5>
      </Link>
      <img
        className="backdrop"
        src={`https://image.tmdb.org/t/p/w500${tvDetails.backdrop_path}`}
        alt=""
      />
      <div>
        <h1>{tvDetails.original_name}</h1>
      </div>

      <div className="detail-part">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
          alt=""
        />

        <div className="detail-text">
          <h2>{tvDetails.tagline}</h2>
          <p>{tvDetails.overview}</p>

          <div className="rating">
            <img
              style={{ width: "15px", height: "15px" }}
              src={star}
              alt={tvDetails.original_name}
            />
            <h3>{tvDetails.vote_average}</h3>
          </div>

          <div className="release-date">
            <h4>First Air Date : </h4>
            <h3>{tvDetails.first_air_date}</h3>
          </div>

          <div>
            <h4>Last Air Data : </h4>
            <h3>{tvDetails.last_air_date}</h3>
          </div>

          <div>
            <h4>Total Seasons : </h4>
            <h3>{seasons.length}</h3>
          </div>

          <div className="genre-el">
            <h4>Genres: </h4>
            <div className="genre">{genreEl}</div>
          </div>
        </div>
      </div>
      {tvVideo && tvVideo.results.length > 0 && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${tvVideo.results[0].key}`}
          title="Teaser Video"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default TvShowDetails;
