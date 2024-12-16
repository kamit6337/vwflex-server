import supabaseClient from "../../lib/supabaseClient.js";
import {
  getTvShowPresentInUserWatchlist,
  setSingleUserWatchlistTvShowIntoRedis,
} from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const isTvInWatchlist = async (userId, tvId, season) => {
  const get = await getTvShowPresentInUserWatchlist(userId, tvId, season);

  if (get) {
    return true;
  }

  const { data, error } = await supabaseClient
    .from("watchlist_tv")
    .select("*")
    .eq("user", userId)
    .eq("id", tvId)
    .eq("season", season);

  if (error) {
    throw new Error(error);
  }

  if (!data || data.length === 0) {
    return false;
  }

  const tvShow = data[0];

  await setSingleUserWatchlistTvShowIntoRedis(userId, tvShow);

  return true;
};

export default isTvInWatchlist;
