import getMovie from "../../services/movie/getMovie.js";
import getNowPlaying from "../../services/movies/getNowPlaying.js";

const movieResolvers = {
  Query: {
    getNowPlaying: getNowPlaying,
    getMovie: getMovie,
  },
};

export default movieResolvers;
