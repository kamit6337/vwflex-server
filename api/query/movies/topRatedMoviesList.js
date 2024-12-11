import {
  getTopRatedFromRedis,
  setTopRatedToRedis,
} from "../../../redis/Movies/moviesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const topRatedMoviesList = async (page = 1) => {
  const get = await getTopRatedFromRedis(page);

  if (get) {
    return get;
  }

  const topRatedMovies = await getReq("/movie/top_rated", {
    params: { page },
  });

  const response = topRatedMovies?.results;

  await setTopRatedToRedis(response);

  return response;
};

export default topRatedMoviesList;
