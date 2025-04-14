import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export function MovieList(props) {
 const location = useLocation()
  return (
    <>
      <ul className={css.list}>
        {props.movies.map((movie) => (
          <li className={css.item} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
