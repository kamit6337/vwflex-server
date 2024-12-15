import supabaseClient from "../../lib/supabaseClient.js";
import {
  getMoviePresentInUserWatchlist,
  setSingleUserWatchlistMovieIntoRedis,
} from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const isMovieInWatchlist = async (userId, movieId) => {
  const get = await getMoviePresentInUserWatchlist(userId, movieId);

  if (get) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("watchlist_movies")
    .select("*")
    .eq("user", userId)
    .eq("id", movieId);

  if (error) {
    throw new Error(error);
  }

  if (!data || data.length === 0) {
    return false;
  }

  const movie = data[0];

  await setSingleUserWatchlistMovieIntoRedis(userId, movie);

  return true;
};

export default isMovieInWatchlist;
