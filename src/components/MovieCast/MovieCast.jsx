import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import { fetchMovieCast } from "../../services/fetchMovies";
import { useParams } from "react-router-dom";

export function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams()


  useEffect(() => {
    async function uploadMovieCast() {
      try {
        setError(false)
        setLoading(true);
        const response = await fetchMovieCast(params.movieId);
        if (response.length === 0) {
          throw new Error("Service is unavailable");
        }

        setCast(response.cast);
      } catch (error) {
        console.log(error);
        setError(true)
      } finally {
        setLoading(false);
      }
    }
    uploadMovieCast()
  }, [params.movieId]);

  return (
    <>{cast.length !== 0 && 
      <div>
        <ul>
          {cast.map((actor) => {
            return (
              <li key={actor.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
              </li>
            );
          })}
        </ul>
        {loading && <p>Loading cast...</p>}
        {error && <p>No actors are found...</p>}
      </div>
    }</>
  );
}
