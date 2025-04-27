import { Suspense, useEffect, useRef, useState } from "react";
import {
  Outlet,
  useLocation,
  useParams,
  Link,
  NavLink,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/fetchMovies";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";

import css from "./MovieDetailsPage.module.css";

export function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(false);
  const location = useLocation();
  const linkRef = useRef(location.state ?? "/movies");

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
    <section className={css.section}>
      {movieDetails && (
        <div>
          <article className={css.movieInfo}>
            <div className={css.movieWrapper}>
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                alt={movieDetails.original_title}
              />
              <div className={css.movieMeta}>
                <h2 className={css.title}>{movieDetails.original_title}</h2>
                <p className={css.score}>
                  User score:{" "}
                  <span className={css.scoreMeta}>
                    {movieDetails.vote_average.toFixed(2)}
                  </span>
                </p>
                <h3 className={css.overview}>Overview</h3>
                <p className={css.desc}>{movieDetails.overview}</p>
                <h3 className={css.genres}>Genres</h3>
                <ul className={css.genresList}>
                  {movieDetails.genres.map((genre) => {
                    return (
                      <li className={css.genresItem} key={genre.id}>
                        {genre.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div>
              <h3 className={css.editional}>Editional information</h3>
              <ul className={css.editionalList}>
                <li className={css.editionalItem}>
                  <NavLink className={css.editionalLink} to="cast">
                    Cast
                  </NavLink>
                </li>
                <li className={css.editionalItem}>
                  <NavLink className={css.editionalLink} to="reviews">
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </article>
          <Suspense fallback="">
            <Outlet />
          </Suspense>
        </div>
      )}
      <Link className={css.backLink} to={linkRef.current}>
        Go back
      </Link>
      {error && <NotFoundPage />}
    </section>
  );
}
