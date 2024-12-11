import {
  getMovieDetailFromRedis,
  setMovieDetailToRedis,
} from "../../../redis/Movies/movieDetail.js";
import { getReq } from "../../../utils/api/api.js";

const fetchMovieDetail = async (id) => {
  const get = await getMovieDetailFromRedis(id);

  if (get) {
    return get;
  }

  const response = await getReq(`/movie/${id}`);

  await setMovieDetailToRedis(response);

  return response;
};

export default fetchMovieDetail;
