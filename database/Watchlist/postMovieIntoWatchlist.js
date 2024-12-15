import supabaseClient from "../../lib/supabaseClient.js";
import { setSingleUserWatchlistMovieIntoRedis } from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const postMovieIntoWatchlist = async (userId, movieId) => {
  if (!userId || !movieId) {
    throw new Error("UserId or MovieId is not provided");
  }

  const { data, error } = await supabaseClient
    .from("watchlist_movies")
    .insert([
      {
        user: userId,
        id: movieId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error);
  }

  await setSingleUserWatchlistMovieIntoRedis(userId, data);

  return true;
};

export default postMovieIntoWatchlist;
