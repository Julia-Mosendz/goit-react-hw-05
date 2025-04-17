import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/fetchMovies";

export function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function uploadMovieReviews() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetchMovieReviews(params.movieId);
        if (response.length === 0) {
          throw new Error("Service is unavailable");
        }

        setReviews(response.results);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    uploadMovieReviews();
  }, [params.movieId]);

  return (
    <>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>Comment: {review.content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
