import checkMovieInWatchlist from "../../services/watchlist/checkMovieInWatchlist.js";
import checkTvShowInWatchlist from "../../services/watchlist/checkTvShowInWatchlist.js";
import deleteWatchlistMovie from "../../services/watchlist/deleteWatchlistMovie.js";
import deleteWatchlistTvShow from "../../services/watchlist/deleteWatchlistTvShow.js";
import getWatchlistMovies from "../../services/watchlist/getWatchlistMovies.js";
import getWatchlistTvShows from "../../services/watchlist/getWatchlistTvShows.js";
import postWatchlistMovie from "../../services/watchlist/postWatchlistMovie.js";
import postWatchlistTvShow from "../../services/watchlist/postWatchlistTvShow.js";

const watchlistResolver = {
  Query: {
    getWatchlistMovies: getWatchlistMovies,
    getWatchlistTvShows: getWatchlistTvShows,
    checkMovieInWatchlist: checkMovieInWatchlist,
    checkTvShowInWatchlist: checkTvShowInWatchlist,
  },

  Mutation: {
    deleteWatchlistMovie: deleteWatchlistMovie,
    deleteWatchlistTvShow: deleteWatchlistTvShow,
    postWatchlistMovie: postWatchlistMovie,
    postWatchlistTvShow: postWatchlistTvShow,
  },
};

export default watchlistResolver;
