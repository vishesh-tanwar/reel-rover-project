import React, { useState, useEffect } from "react";
import Imdbcard from "./Imdbcard";
import MovieSearchBar from "./MovieSearchBar.js";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [pageno, setPageno] = useState(1); 
  const [error, setError] = useState(null);

  const fetchMovies = async (page = 1) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=9f48a5b363c49e0c31bf3d09bb319827&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setMovies(data.results);
      setError(""); // Clear any errors
    } catch (err) {
      setMovies([]);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMovies(pageno);
  }, [pageno]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "16px",
    padding: "16px",
    justifyContent: "center",
  };

  return (
    <div>
      <MovieSearchBar setMovies={setMovies} setError={setError} />

      {error ? (
        <p>Error fetching movies: {error}</p>
      ) : (
        <div style={gridStyle}>
          {movies.map((movie) => (
            <Imdbcard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!error && (
        <div className="pagination" style={{ textAlign: "center", margin: "20px" }}>
          <button disabled={pageno === 1} onClick={() => setPageno(pageno - 1)}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>Page {pageno}</span>
          <button onClick={() => setPageno(pageno + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Home;

  