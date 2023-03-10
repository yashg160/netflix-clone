export const API_CONSTANTS = {
  FETCH_TRENDING: `/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
  FETCH_NETFLIX_ORIGINALS: `/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_networks=213`,
  FETCH_TOP_RATED: `/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
  FETCH_ACTION_MOVIES: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`,
  FETCH_COMEDY_MOVIES: `/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`,
};
