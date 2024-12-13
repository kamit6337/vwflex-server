import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import supabaseClient from "../../lib/supabaseClient.js";
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

  const { data, error } = await supabaseClient
    .from("watchlist_tv")
    .select("*")
    .eq("user", userId) // Ensure you filter by user ID
    .order("created_at", { ascending: false }); // Sort by created_at descending

  if (error) {
    throw new Error(error);
  }

  if (data?.length === 0) {
    return data;
  }

  // const tvShows = await WatchlistTv.find({
  //   user: userId,
  // })
  //   .lean()
  //   .sort("-createdAt");

  // const response = JSON.parse(JSON.stringify(tvShows));

  const tvShowsDetails = data.map(async (obj) => {
    const { id, season } = obj;
    const get = await fetchTvShowAdditional(id, { season });
    return { ...get, id: id, season: season };
  });

  await setUserWatchlistTvShowsIntoRedis(userId, tvShowsDetails);

  return tvShowsDetails;
};

export default getUserWatchlistTvShows;
