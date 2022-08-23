import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './home.css'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState([true])

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: 'pt-BR',
          page: 1
        }
      })
      setMovies(response.data.results)
      console.log(response.data.results)
      setLoading(false)
    }
    loadMovies()
  }, [])

  if (loading) {
    return <div class="lds-dual-ring"></div>
  }

  return (
    <div>
      <div className="container">
        <div className="moviesList">
          {movies.map(movies => {
            return (
              <article key={movies.title}>
                <strong>{movies.title}</strong> <br />
                <img
                  src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
                  alt={movies.title}
                />
                <Link to={`/movies/${movies.id}`}>Acessar</Link>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
