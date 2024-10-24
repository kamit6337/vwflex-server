import {
  getTopRatedTvShowsFromRedis,
  setTopRatedTvShowsToRedis,
} from "../../../redis/TvShows/tvShowsFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const topRatedTvShows = async (page = 1) => {
  const get = await getTopRatedTvShowsFromRedis(page);
  if (get) {
    return get;
  }

  const tv = await getReq("/tv/top_rated", { params: { page } });

  const response = tv?.results;

  await setTopRatedTvShowsToRedis(response);

  return response;
};

export default topRatedTvShows;
