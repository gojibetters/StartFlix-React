import './error.css'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Not found.</h2>
      <Link to="/">See all movies!</Link>
    </div>
  )
}

export default Error
