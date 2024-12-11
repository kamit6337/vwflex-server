import {
  getNowPlayingFromRedis,
  setNowPlayingToRedis,
} from "../../../redis/Movies/moviesFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const nowPlayingMoviesList = async (page = 1) => {
  const get = await getNowPlayingFromRedis(page);
  if (get) {
    return get;
  }

  const nowPlayingMovies = await getReq("/movie/now_playing", {
    params: { page },
  });

  const response = nowPlayingMovies?.results;

  await setNowPlayingToRedis(response);

  return response;
};

export default nowPlayingMoviesList;
