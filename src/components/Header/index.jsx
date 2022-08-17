import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        StartFlix
      </Link>
      <Link to="favorites" className="favorites">
        My Movies
      </Link>
    </header>
  )
}
