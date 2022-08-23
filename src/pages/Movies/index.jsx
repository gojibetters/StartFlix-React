import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import './movies.css'

function Movies() {
  const { id } = useParams()
  const [movies, setMovies] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadMovies() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: 'en-US'
          }
        })
        .then(response => {
          console.log(response)
          setMovies(response.data)
          setLoading(false)
        })
        .catch(() => {
          console.log('Movie not found')
        })
    }
    loadMovies()
  }, [])

  if (loading) {
    return <div class="lds-dual-ring"></div>
  }

  return (
    <div className="movies-info">
      <h1>{movies.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`}
        alt={movies.title}
      />
      <h3>Sinopse</h3>
      <p>{movies.overview}</p>
      <strong>Avaliação: {movies.vote_average}/10</strong>
      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a
            target={'_blank'}
            rel={'noreferrer'}
            href={`https://www.youtube.com/results?search_query=${movies.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movies
