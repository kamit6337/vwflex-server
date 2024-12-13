import supabaseClient from "../../lib/supabaseClient.js";
import { deleteSingleUserWatchlistTvShowFromRedis } from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const deleteUserWatchlistTvShow = async (userId, tvId, season) => {
  if (!userId || !tvId || !season) {
    throw new Error("All field is required");
  }

  const { error } = await supabaseClient
    .from("watchlist_tv")
    .delete()
    .eq("user", userId)
    .eq("id", tvId)
    .eq("season", season);

  if (error) {
    throw new Error(error);
  }

  await deleteSingleUserWatchlistTvShowFromRedis(userId, tvId, season);

  return false;
};

export default deleteUserWatchlistTvShow;
