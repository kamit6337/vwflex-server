import supabaseClient from "../../lib/supabaseClient.js";
import { setSingleUserWatchlistTvShowIntoRedis } from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const postTvShowsIntoWatchlist = async (userId, tvId, season) => {
  if (!userId || !tvId || !season) {
    throw new Error("UserId or TvId is not provided");
  }

  const { error } = await supabaseClient
    .from("watchlist_tv")
    .insert([
      {
        user: userId,
        id: tvId,
        season: season,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error);
  }

  // await WatchlistTv.create({
  //   user: userId,
  //   id: tvId,
  //   season,
  // });

  await setSingleUserWatchlistTvShowIntoRedis(userId, tvId, season);

  return true;
};

export default postTvShowsIntoWatchlist;
