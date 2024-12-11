import {
  getPopularPeoplesFromRedis,
  setPopularPeoplesIntoRedis,
} from "../../../redis/Peoples/popularPeoplesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const popularPeoples = async (page = 1) => {
  const get = await getPopularPeoplesFromRedis(page);

  if (get) {
    return get;
  }

  const peoples = await getReq("/person/popular", {
    params: { page },
  });

  const response = peoples.results;

  await setPopularPeoplesIntoRedis(response);

  return response;
};

export default popularPeoples;
