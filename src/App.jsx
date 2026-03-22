import { useState, useEffect } from "react";
import "./App.css";

const token = import.meta.env.VITE_API_KEY;

function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFirstInput, setIsFirstInput] = useState(true);
  const [query, setQuery] = useState("");

  async function searchMovies(searchQuery) {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${token}&s=${searchQuery}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  // Effect for debouncing
  useEffect(() => {
    if (isFirstInput) return;

    if (query === "") {
      setMovies(null);
      return;
    }

    const timer = setTimeout(() => {
      searchMovies(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return; // Evitar espacios al inicio

    setQuery(newQuery);
    setIsFirstInput(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <header>
        <h1>Buscador de Películas</h1>
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Avengers, Star Wars..."
          />
          <button type="submit">Search</button>
        </form>

        {loading && <p className="status">Cargando...</p>}

        {isFirstInput && !loading && (
          <p className="status">¡Busca tu primera película!</p>
        )}

        {!loading && !isFirstInput && movies?.length === 0 && (
          <p className="status">No se encontraron resultados para "{query}".</p>
        )}

        {!loading && movies?.length > 0 && (
          <ul className="movies">
            {movies.map((movie) => (
              <li key={movie.imdbID} className="movie">
                <img src={movie.Poster} alt={movie.Title} />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
