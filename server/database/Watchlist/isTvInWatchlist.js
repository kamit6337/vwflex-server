import WatchlistTv from "../../models/WatchListTvModel.js";
import { getTvShowPresentInUserWatchlist } from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const isTvInWatchlist = catchAsyncError(async (userId, tvId, season) => {
  const get = await getTvShowPresentInUserWatchlist(userId, tvId, season);

  if (get) {
    return get;
  }

  const findTv = await WatchlistTv.exists({
    user: userId,
    tvId: Number(tvId),
    season: Number(season),
  });

  return !!findTv;
});

export default isTvInWatchlist;
