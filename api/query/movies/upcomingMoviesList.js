import {
  getUpcomingFromRedis,
  setUpcomingToRedis,
} from "../../../redis/Movies/moviesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const upcomingMoviesList = async (page = 1) => {
  const get = await getUpcomingFromRedis(page);

  if (get) {
    return get;
  }

  const upcomingMovies = await getReq("/movie/upcoming", {
    params: { page },
  });

  const response = upcomingMovies?.results;

  await setUpcomingToRedis(response);

  return response;
};

export default upcomingMoviesList;
