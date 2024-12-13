import { deleteSingleUserWatchlistTvShowFromRedis } from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const deleteUserWatchlistTvShow = async (userId, tvId, season) => {
  if (!userId || !tvId || !season) {
    throw new Error("All field is required");
  }

  // await WatchlistTv.deleteOne({
  //   user: userId,
  //   id: tvId,
  //   season,
  // });

  // await deleteSingleUserWatchlistTvShowFromRedis(userId, tvId, season);

  return false;
};

export default deleteUserWatchlistTvShow;
