import {
  getAiringTodayTvShowsFromRedis,
  setAiringTodayTvShowsToRedis,
} from "../../../redis/TvShows/tvShowsFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const airingTodayList = async (page = 1) => {
  const get = await getAiringTodayTvShowsFromRedis(page);

  if (get) {
    return get;
  }

  const tv = await getReq("/tv/airing_today", {
    params: { page },
  });

  const response = tv?.results;

  await setAiringTodayTvShowsToRedis(response);

  return response;
};

export default airingTodayList;
