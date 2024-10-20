import {
  getMovieDetailFromRedis,
  setMovieDetailToRedis,
} from "../../../redis/Movies/movieDetail.js";
import { getReq } from "../../../utils/api/api.js";

const fetchMovieDetail = async (
  id
  // { recommendations = false, page = 1 } = {}
) => {
  const get = await getMovieDetailFromRedis(id);

  if (get) {
    return get;
  }

  const response = await getReq(`/movie/${id}`);

  // if (recommendations) {
  //   const movieRecommendations = await getReq(`/movie/${id}/recommendations`, {
  //     params: { page },
  //   });

  //   response.recommendations = {
  //     page: movieRecommendations.page,
  //     data: movieRecommendations.results,
  //   };
  // }

  await setMovieDetailToRedis(response);

  return response;
};

export default fetchMovieDetail;
