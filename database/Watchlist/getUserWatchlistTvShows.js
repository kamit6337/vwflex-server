import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import supabaseClient from "../../lib/supabaseClient.js";
import {
  getUserWatchlistTvShowsFromRedis,
  setUserWatchlistTvShowsIntoRedis,
} from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const getUserWatchlistTvShows = async (userId, page = 1) => {
  if (!userId) {
    throw new Error("UserId is not provided");
  }

  const limit = 5;
  const skip = (page - 1) * limit; // Calculate starting index
  const to = skip + limit - 1; // Calculate ending index

  const get = await getUserWatchlistTvShowsFromRedis(userId, page, limit);

  if (get) {
    return get;
  }

  const { data, error } = await supabaseClient
    .from("watchlist_tv")
    .select("*")
    .eq("user", userId) // Ensure you filter by user ID
    .order("created_at", { ascending: false }) // Sort by created_at descending
    .range(skip, to);

  if (error) {
    throw new Error(error);
  }

  if (data?.length === 0) {
    return data;
  }

  const tvShowsDetails = await Promise.all(
    data.map(async (obj) => {
      const { id, season, created_at } = obj;
      const get = await fetchTvShowAdditional(id, { season });
      return { ...get, id: id, season: season, created_at };
    })
  );

  await setUserWatchlistTvShowsIntoRedis(userId, tvShowsDetails);

  return tvShowsDetails;
};

export default getUserWatchlistTvShows;
