import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Movies from './pages/Movies'

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<Movies />} />
        </Routes>
      </Header>
    </BrowserRouter>
  )
}
