import fetchMovieDetail from "../../api/query/movie/fetchMovieDetail.js";
import supabaseClient from "../../lib/supabaseClient.js";
import {
  getUserWatchlistMoviesFromRedis,
  setUserWatchlistMoviesIntoRedis,
} from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const getUserWatchlistMovies = async (userId) => {
  if (!userId) {
    throw new Error("UserId is not provided");
  }

  const get = await getUserWatchlistMoviesFromRedis(userId);

  if (get) {
    return get;
  }

  const { data, error } = await supabaseClient
    .from("watchlist_movies")
    .select(
      `
      *
    `
    )
    .eq("user", userId) // Ensure you filter by user ID
    .order("created_at", { ascending: false }); // Sort by created_at descending

  if (error) {
    throw new Error(error);
  }

  if (data?.length === 0) {
    return data;
  }

  const movieDetails = await Promise.all(
    data.map(async (obj) => {
      const { id, created_at } = obj;
      const result = await fetchMovieDetail(id);
      return { ...result, created_at };
    })
  );

  await setUserWatchlistMoviesIntoRedis(userId, movieDetails);

  return movieDetails;
};

export default getUserWatchlistMovies;
