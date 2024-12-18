import fetchMovieDetail from "../../api/query/movie/fetchMovieDetail.js";
import supabaseClient from "../../lib/supabaseClient.js";
import {
  getUserWatchlistMoviesFromRedis,
  setUserWatchlistMoviesIntoRedis,
} from "../../redis/Watchlist/watchlistMoviesFromRedis.js";

const getUserWatchlistMovies = async (userId, page = 1) => {
  if (!userId) {
    throw new Error("UserId is not provided");
  }

  const limit = 5;
  const skip = (page - 1) * limit; // Calculate starting index
  const to = skip + limit - 1; // Calculate ending index

  const get = await getUserWatchlistMoviesFromRedis(userId, page, limit);

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
    .order("created_at", { ascending: false }) // Sort by created_at descending
    .range(skip, to);

  if (error) {
    throw new Error(error);
  }

  if (data?.length === 0) {
    return data;
  }
  console.log(
    "data from supabase",
    data.map((obj) => obj.id)
  );

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
