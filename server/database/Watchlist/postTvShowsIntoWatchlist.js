import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import WatchlistTv from "../../models/WatchListTvModel.js";
import { setSingleUserWatchlistTvShowIntoRedis } from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const postTvShowsIntoWatchlist = async (userId, tvId, season) => {
  if (!userId || !tvId || !season) {
    throw new Error("UserId or TvId is not provided");
  }

  const create = await WatchlistTv.create({
    user: userId,
    id: tvId,
    season,
  });

  const tvShow = await fetchTvShowAdditional(tvId, { season });

  const modify = { ...tvShow, id: tvId, season };

  await setSingleUserWatchlistTvShowIntoRedis(modify);

  return tvShow;
};

export default postTvShowsIntoWatchlist;
