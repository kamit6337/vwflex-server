import {
  getTrendingPeoplesFromRedis,
  setTrendingPeoplesIntoRedis,
} from "../../../redis/Trending/trendingPeoplesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const DAY = "DAY";
const WEEK = "WEEK";

const trendingPeoples = async (time = DAY) => {
  const get = await getTrendingPeoplesFromRedis(time);

  if (get) {
    return get;
  }

  if (time === WEEK) {
    const trendingPeoples = await getReq(`/trending/person/week`);
    const response = trendingPeoples?.results;

    await setTrendingPeoplesIntoRedis(time, response);
    return response;
  }

  const trendingPeoples = await getReq(`/trending/person/day`);
  const response = trendingPeoples?.results;
  await setTrendingPeoplesIntoRedis(time, response);

  return response;
};

export default trendingPeoples;
