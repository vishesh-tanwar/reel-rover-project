import React, { useState } from "react";
import axios from "axios";

const MovieSearchBar = ({ setMovies, setError }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery) return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=9f48a5b363c49e0c31bf3d09bb319827&query=${searchQuery}`
      );

      if (response.data.results.length > 0) {
        setMovies(response.data.results);
        setError(""); // Clear any errors
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (err) {
      setMovies([]);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Search for Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter movie title"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default MovieSearchBar;
