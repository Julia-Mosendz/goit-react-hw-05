import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/fetchMovies';
import { MovieList } from '../../components/MovieList/MovieList';
import FilmsWrapper from '../../components/FilmsWrapper/FilmsWrapper';

import css from './HomePage.module.css';

export default function HomePage() {
  const [trendyMovies, setTrendyMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function uploadTrendyMovies() {
      try {
        setLoading(true);
        const response = await fetchTrendingMovies();

        if (response.length === 0) {
          throw new Error('Service is unavailable');
        }

        setTrendyMovies(response.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    uploadTrendyMovies();
  }, []);

  return (
    <>
      <section className={css.homePage}>
        <div className={css.wrapper}>
          <h1 className={css.title}>My Movie Vault</h1>
          <p className={css.desc}>
            Start exploring cinema magic with a sleek movie catalog design
          </p>
          <a className={css.btn} href="#films-list">
            Explore films
          </a>
        </div>

        {trendyMovies.length > 0 && <FilmsWrapper movies={trendyMovies} />}

        {loading && <p>Loading...</p>}
      </section>
      <section className={css.films} id="films-list">
        {trendyMovies.length > 0 && <MovieList movies={trendyMovies} />}
      </section>
    </>
  );
}
