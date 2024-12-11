import {
  getPopularFromRedis,
  setPopularToRedis,
} from "../../../redis/Movies/moviesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const popularMoviesList = async (page = 1) => {
  const get = await getPopularFromRedis(page);

  if (get) {
    return get;
  }

  const popularMovies = await getReq("/movie/popular", {
    params: { page },
  });

  const response = popularMovies?.results;

  await setPopularToRedis(response);

  return response;
};

export default popularMoviesList;
