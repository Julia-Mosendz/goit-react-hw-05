import { useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { useEffect } from "react";
import { fetchMovieDetails } from "../../services/fetchMovies";

export function MovieDetailsPage() {
  const params = useParams();
  console.log(params);
  useEffect(() => {
    async function uploadMovieDetails() {
      try {
        const response = await fetchMovieDetails(params.movieId);
        console.log (response)
      } catch (error) {}
    }
    uploadMovieDetails()
  }, [params.movieId]);

  return <>MovieDetails</>;
}
