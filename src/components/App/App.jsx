import { Route, Routes } from "react-router-dom";
import { Navigation } from "../Navigation/Navigation";
import { HomePage } from "../../pages/HomePage/HomePage";
import { MoviesPage } from "../../pages/MoviesPage/MoviesPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { MovieDetailsPage } from "../../pages/MovieDetailsPage/MovieDetailsPage";
import { MovieCast } from "../MovieCast/MovieCast";
import { MovieReviews } from "../MovieReviews/MovieReviews";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />

        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
