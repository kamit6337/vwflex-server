import getMovie from "../../services/movie/getMovie.js";
import getMovieImages from "../../services/movie/getMovieImages.js";
import getMovieRecommendations from "../../services/movie/getMovieRecommendations.js";
import getMovieReviews from "../../services/movie/getMovieReviews.js";
import getSimilarMovies from "../../services/movie/getSimilarMovies.js";
import getNowPlaying from "../../services/movies/getNowPlaying.js";
import getPopularMovies from "../../services/movies/getPopularMovies.js";
import getTopRatedMovies from "../../services/movies/getTopRatedMovies.js";
import getUpcomingMovies from "../../services/movies/getUpcomingMovies.js";

const movieResolvers = {
  Query: {
    getNowPlayingMovies: getNowPlaying,
    getPopularMovies: getPopularMovies,
    getTopRatedMovies: getTopRatedMovies,
    getUpcomingMovies: getUpcomingMovies,
    getMovie: getMovie,
    getMovieRecommendations: getMovieRecommendations,
    getSimilarMovies: getSimilarMovies,
    getMovieImages: getMovieImages,
    getMovieReviews: getMovieReviews,
  },
};

export default movieResolvers;
