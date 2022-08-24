import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { toast } from 'react-toastify'

function Favorites() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const localListMovies = localStorage.getItem('@movies')
    setMovies(JSON.parse(localListMovies) || [])
  }, [])

  function deleteMovie(id) {
    let filterMovies = movies.filter(item => {
      return item.id !== id
    })

    setMovies(filterMovies)

    localStorage.setItem('@movies', JSON.stringify(filterMovies))

    toast.success('Deleted with success')
  }

  return (
    <div className="fav-movies">
      <h1>Favorites screen</h1>

      {movies.length === 0 && (
        <span>You don't have any favorites movies :(</span>
      )}

      <ul>
        {movies.map(item => {
          return (
            <>
              <li key={item.id}>
                <span key={item.id}>{item.title}</span>
                <span key={item.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                  />
                </span>
              </li>

              <div>
                <Link to={`/movies/${item.id}`}>See Details</Link>
                <button onClick={() => deleteMovie(item.id)}>Delete</button>
              </div>
            </>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites
