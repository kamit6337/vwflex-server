import {
  getOnTheListShowsFromRedis,
  setOnTheListShowsToRedis,
} from "../../../redis/TvShows/tvShowsFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const onTheAirList = async (page = 1) => {
  const get = await getOnTheListShowsFromRedis(page);

  if (get) {
    return get;
  }

  const tv = await getReq("/tv/on_the_air", { params: { page } });

  const response = tv?.results;

  await setOnTheListShowsToRedis(response);

  return response;
};

export default onTheAirList;
