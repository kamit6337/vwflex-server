import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import {
  getUserWatchlistTvShowsFromRedis,
  setUserWatchlistTvShowsIntoRedis,
} from "../../redis/Watchlist/WatchlistTvShowsFromRedis.js";

const getUserWatchlistTvShows = async (userId) => {
  if (!userId) {
    throw new Error("UserId is not provided");
  }

  const get = await getUserWatchlistTvShowsFromRedis(userId);

  if (get) {
    return get;
  }

  // const tvShows = await WatchlistTv.find({
  //   user: userId,
  // })
  //   .lean()
  //   .sort("-createdAt");

  // const response = JSON.parse(JSON.stringify(tvShows));

  // const tvShowsDetails = response.map(async (obj) => {
  //   const { id, season } = obj;
  //   const get = await fetchTvShowAdditional(id, { season });
  //   return { ...get, id: id, season: season };
  // });

  // await setUserWatchlistTvShowsIntoRedis(userId, tvShowsDetails);

  return "bye";
};

export default getUserWatchlistTvShows;
