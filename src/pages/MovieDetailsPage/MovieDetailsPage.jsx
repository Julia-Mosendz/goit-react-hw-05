import { Outlet, useLocation, useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { fetchMovieDetails } from "../../services/fetchMovies";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);
  const location = useLocation()
  const linkRef = useRef(location.state ?? "/movies")

  const params = useParams();
  
  useEffect(() => {
    async function uploadMovieDetails() {
      try {
        setError(false);
        const response = await fetchMovieDetails(params.movieId);
        setMovieDetails(response);
      } catch (error) {
        console.log(error.message);
        setError(true);
      }
    }
    uploadMovieDetails();
  }, [params.movieId]);

  return (
    <>
      <Link to={linkRef.current}>Go back</Link>
      {movieDetails && (
        <article>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
              alt={movieDetails.original_title}
            />
            <div>
              <h2>{movieDetails.original_title}</h2>
              <p>
                <span>User score: {movieDetails.vote_average}</span>
              </p>
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movieDetails.genres.map((genre) => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <h3>Editional information</h3>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </div>
        </article>
      )}
      {error && <NotFoundPage />}
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </>
  );
}
