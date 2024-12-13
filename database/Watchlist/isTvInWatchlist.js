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

  const { count, error } = await supabaseClient
    .from("watchlist_tv")
    .select("*", { count: "exact", head: true })
    .eq("user", userId)
    .eq("id", tvId)
    .eq("season", season);

  if (error) {
    throw new Error(error);
  }

  const bool = count > 0;

  if (bool) {
    await setSingleUserWatchlistTvShowIntoRedis(userId, tvId, season);
  }

  return bool;
};

export default isTvInWatchlist;
