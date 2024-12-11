import {
  getPopularTvShowsFromRedis,
  setPopularTvShowsToRedis,
} from "../../../redis/TvShows/tvShowsFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const popularTvShowsList = async (page = 1) => {
  const get = await getPopularTvShowsFromRedis(page);

  if (get) {
    return get;
  }

  const tv = await getReq("/tv/popular", { params: { page } });

  const response = tv?.results;

  await setPopularTvShowsToRedis(response);

  return response;
};

export default popularTvShowsList;
