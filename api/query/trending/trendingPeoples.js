import {
  getTrendingPeoplesFromRedis,
  setTrendingPeoplesIntoRedis,
} from "../../../redis/Trending/trendingPeoplesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const DAY = "day";
const WEEK = "week";

const trendingPeoples = async (time = DAY) => {
  const get = await getTrendingPeoplesFromRedis(time);

  if (get) {
    return get;
  }

  if (time === WEEK) {
    const trendingPeoples = await getReq(`/trending/person/${WEEK}`);
    const response = trendingPeoples?.results;

    await setTrendingPeoplesIntoRedis(time, response);

    return response;
  }

  const trendingPeoples = await getReq(`/trending/person/${DAY}`);
  const response = trendingPeoples?.results;
  await setTrendingPeoplesIntoRedis(time, response);

  return response;
};

export default trendingPeoples;
