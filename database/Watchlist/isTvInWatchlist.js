import {
  getTvShowPresentInUserWatchlist,
  setSingleUserWatchlistTvShowIntoRedis,
} from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const isTvInWatchlist = async (userId, tvId, season) => {
  const get = await getTvShowPresentInUserWatchlist(userId, tvId, season);

  if (get) {
    return true;
  }

  const findTv = true;

  // await WatchlistTv.exists({
  //   user: userId,
  //   tvId: Number(tvId),
  //   season: Number(season),
  // });

  if (!!findTv) {
    await setSingleUserWatchlistTvShowIntoRedis(userId, tvId, season);
  }

  return !!findTv;
};

export default isTvInWatchlist;
