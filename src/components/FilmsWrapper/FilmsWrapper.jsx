import Masonry from "react-responsive-masonry";
import css from "./FilmsWrapper.module.css";

export default function FilmsWrapper(props) {
  return (
    <Masonry className={css.wrapper} columnsCount={4} gutter="32px">
      {props.movies.map((movie) => {
        return (
          <img
            className={css.poster}
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={movie.title}
            key={movie.id}
          />
        );
      })}
    </Masonry>
  );
}
