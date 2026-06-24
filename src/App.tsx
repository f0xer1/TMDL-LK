import { Route, Routes } from "react-router-dom"
import './App.css'
import Header from "./components/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";

function App() {

  return (<>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  </>)
}

export default App
