import "./App.css";
import { useState } from "react";
import movies from "./mocks/withResults.json";

function App() {
  const [movie, setMovie] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = new window.FormData(event.target);
    const query = fields.get("query");
    console.log(query);
    setMovie(query);
  };

  return (
    <div>
      <header>
        <h1>Peliculas</h1>
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            type="text"
            placeholder="Avengers, Star Wars..."
          />
          <button type="submit">Search</button>
        </form>

        <ul className="movies">
          {movies.map((movie) => (
            <li key={movie.imdbID} className="movie">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </li>
          ))}
        </ul>
      </main>
      <footer>{movie && <p>{movie}</p>}</footer>
    </div>
  );
}

export default App;
