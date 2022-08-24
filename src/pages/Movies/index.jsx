import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import './movies.css'
import { toast } from 'react-toastify'

function Movies() {
  const { id } = useParams()
  const [movies, setMovies] = useState({})
  const [loading, setLoading] = useState(true)
  const navigation = useNavigate()

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
          setMovies(response.data)
          setLoading(false)
        })
        .catch(() => {
          toast.warn('Movie not found!')

          navigation('/', { replace: true })
          return
        })
    }
    loadMovies()
  }, [])

  function saveMovie() {
    const localListMovies = localStorage.getItem('@movies')
    let savedMovies = JSON.parse(localListMovies) || []

    const hasMovie = savedMovies.some(
      savedMovies => savedMovies.id == movies.id
    )

    if (hasMovie) {
      toast.warn('This movie already is on your list!')
      return
    }

    savedMovies.push(movies)
    localStorage.setItem('@movies', JSON.stringify(savedMovies))
    toast.info('Saved movie')
  }

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
      <h3>Synopsis</h3>
      <p>{movies.overview}</p>
      <strong>Rating: {movies.vote_average}/10</strong>
      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>

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
