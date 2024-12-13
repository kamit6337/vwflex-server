import { setSingleUserWatchlistTvShowIntoRedis } from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const postTvShowsIntoWatchlist = async (userId, tvId, season) => {
  if (!userId || !tvId || !season) {
    throw new Error("UserId or TvId is not provided");
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
