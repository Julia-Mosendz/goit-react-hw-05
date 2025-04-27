import { Link, useLocation } from "react-router-dom";
import Masonry from "react-responsive-masonry";
import Measure from "react-measure";
import css from "./MovieList.module.css";

export function MovieList(props) {
  const location = useLocation();

  return (
    <Masonry className={css.list} columnsCount={4} gutter="18px">
      {props.movies.map((movie, idx) => (
        <Measure className={css.item} key={movie.id}>
          {({ measureRef }) => (
            <Link
              className={css.link}
              to={`/movies/${movie.id}`}
              state={location}
              ref={measureRef}
              style={{
                height: idx % 2 ? "200px" : "250px",
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
              }}
            >
              <p className={css.title}>{movie.title}</p>
              <div className={css.overlay}>
                <p className={css.overlayText}>{movie.overview}</p>
              </div>
            </Link>
          )}
        </Measure>
      ))}
    </Masonry>
  );
}
