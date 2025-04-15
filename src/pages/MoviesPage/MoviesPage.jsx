import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import { fetchMoviesByQuery } from "../../services/fetchMovies";
import { MovieList } from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export function MoviesPage() {
  const [error, setError] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams("")
  const query = searchParams.get("query") ??  ""
  
  useEffect(() => {
    async function uploadMoviesByQuery() {
      try {
        setError(false)
        setLoading(true);
        const response = await fetchMoviesByQuery(query);

        if (response.length === 0) {
          throw new Error("Service is unavailable");
        }

        setSearchMovies(response.results);
      } catch (error) {
        console.log(error);
        setError(true)
      } finally {
        setLoading(false);
      }
    }
    uploadMoviesByQuery();
  }, [query, setSearchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          name="query"
          placeholder="Find your first film..."
        />
        <button type="submit">Search</button>
      </form>
      {searchMovies.length > 0 && <MovieList movies={searchMovies}/>}
      {error && <p>No movies found</p>}
      {loading && <p>Loading...</p>}
    </>
  );
}
