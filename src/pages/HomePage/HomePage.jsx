import { useEffect, useState } from "react";
import css from "./HomePage.module.css";
import { MovieList } from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../services/fetchMovies";

export function HomePage() {
  const [trendyMovies, setTrendyMovies] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function uploadTrendyMovies() {
      try {
        setLoading(true)
        const response = await fetchTrendingMovies();

        if (response.length === 0) {
          throw new Error("Service is unavailable");
        }

        setTrendyMovies(response.results);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    }
    uploadTrendyMovies();
  }, []);

  return (
    <>
      <h1>Trendy Movies</h1>
      {trendyMovies.length > 0 && <MovieList movies={trendyMovies} />} 
      
      {loading && <p>Loading...</p>}
    </>
  );
}
