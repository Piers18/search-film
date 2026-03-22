import './App.css'
import movies from './mocks/withResults.json'

function App() {

  return (
    <div>
      <header>
        <h1>Peliculas</h1>
      </header>
      <main>
        <form action="">
          <input type="text" />
          <button type='submit'>Search</button>
        </form>

        <ul className='movies'>
          {movies.map((movie) => (
            <li key={movie.imdbID} className='movie'>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
