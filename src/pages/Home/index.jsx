import { useState, useEffect } from 'react'
import api from '../../services/api'
require('dotenv').config()

export default function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: process.env.api_key,
          language: 'pt-BR',
          page: 1
        }
      })
      setMovies(response.data.results)
    }
    loadMovies()
  }, [])

  return (
    <div>
      <div className="container">
        <div className="moviesList">
          {movies.map(movies => {
            return (
              <article>
                <strong>{movies.title}</strong> <br />
                <img
                  src={'https://image.tmdb.org/t/p/w500' + movies.poster_path}
                  width="450px"
                />
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
