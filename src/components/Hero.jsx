import React from "react";
import searchIcon from "../assets/search-normal.svg";
import { Outlet } from "react-router-dom";

function Hero({ searchInput, setSearchInput }) {
  const handleSearch = (event) => {
    event.preventDefault();
    const newSearchTerm = event.target.searchValue.value;
    setSearchInput(newSearchTerm);
  };

  const handelChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="hero-section">
      <div className="text">
        <h1>Discover Your Next Favorite Movies and Tv</h1>
        <p>
          Explore a vast collection of movies, find recommendations, and stay
          up-to-date with the latest releases.
        </p>
      </div>

      <form onSubmit={handleSearch}>
        <img src={searchIcon} alt="" />
        <input
          type="search"
          placeholder="Search Movies or TV Shows"
          onChange={handelChange}
          value={searchInput}
          name="searchValue"
        />
        <button>Search</button>
      </form>
      <Outlet />
    </div>
  );
}

export default Hero;
