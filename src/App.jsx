import { useState } from "react";
import "./App.css";

const token = import.meta.env.VITE_API_KEY;

function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFirstInput, setIsFirstInput] = useState(true);

  async function searchMovies(query) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${token}&s=${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return { Response: "False", Error: "Error de conexión" };
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = new window.FormData(event.target);
    const query = fields.get("query")?.trim();

    if (!query) return;

    setLoading(true);
    setIsFirstInput(false);

    const json = await searchMovies(query);

    if (json.Response === "True") {
      setMovies(json.Search);
    } else {
      setMovies([]); // Lista vacía si no hay resultados
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Buscador de Películas</h1>
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <input name="query" type="text" placeholder="Avengers, Star Wars..." />
          <button type="submit">Search</button>
        </form>

        {loading && <p className="status">Cargando...</p>}

        {isFirstInput && !loading && (
          <p className="status">¡Busca tu primera película!</p>
        )}

        {!loading && !isFirstInput && movies?.length === 0 && (
          <p className="status">No se encontraron resultados para tu búsqueda.</p>
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
