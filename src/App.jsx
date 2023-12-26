import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TvShowCard from "./pages/TvShowCard";
import AboutUs from "./pages/AboutUs";
import Hero from "./components/Hero";
import MovieCard from "./pages/MovieCard";
import MovieDetails from "./pages/MovieDetails";
import TvShowDetails from "./pages/TvShowDetails";
function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Hero searchInput={searchInput} setSearchInput={setSearchInput} />
            }
          >
            <Route
              index
              element={
                <MovieCard
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
              }
            />
            <Route
              path="tvshow"
              element={
                <TvShowCard
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
              }
            />
          </Route>

          <Route path="/:id" element={<MovieDetails />} />
          <Route path="tvshow/:id" element={<TvShowDetails />} />
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
