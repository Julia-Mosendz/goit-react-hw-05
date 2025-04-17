import axios from "axios"
import { ACCESS_TOKEN } from "./config"

axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`

export async function fetchTrendingMovies() {
    const response = await axios.get("/trending/movie/day?language=en-US")
    return response.data
}


export async function fetchMovieDetails(movieId) {
  const response = await axios.get(`/movie/${movieId}?language=en-US`);
  return response.data;
}

export async function fetchMoviesByQuery(query) {
  const response = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );
  return response.data;
}



export async function fetchMovieCast(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits?language=en-US`);
  return response.data;
}



export async function fetchMovieReviews(movieId) {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US&page=1`
  );
  return response.data;
}


