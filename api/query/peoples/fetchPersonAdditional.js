import {
  getPersonMoviesFromRedis,
  getPersonTvShowsFromRedis,
  personImagesFromRedis,
  setPersonImagesToRedis,
  setPersonMovieToRedis,
  setPersonTvShowsToRedis,
} from "../../../redis/Peoples/peoplesAdditionalFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const fetchPersonAdditional = async (
  id,
  { images = false, movies = false, tv = false }
) => {
  if (images) {
    const get = await personImagesFromRedis(id);
    if (get) {
      return get;
    }

    const personImages = await getReq(`/person/${id}/images`);

    const modifyPersonImages = personImages?.profiles?.map((obj) => {
      const { aspect_ratio: ratio, file_path: path } = obj;
      return { ratio, path };
    });

    await setPersonImagesToRedis(id, modifyPersonImages);

    return modifyPersonImages;
  }

  if (movies) {
    const getMovies = await getPersonMoviesFromRedis(id);

    if (getMovies) {
      return getMovies;
    }

    const personMovieCredits = await getReq(`/person/${id}/movie_credits`);
    const response = personMovieCredits?.cast;
    await setPersonMovieToRedis(id, response);

    return response;
  }

  if (tv) {
    const getTvShows = await getPersonTvShowsFromRedis(id);

    if (getTvShows) {
      return getTvShows;
    }

    const personTvCredits = await getReq(`/person/${id}/tv_credits`);
    const response = personTvCredits?.cast;
    await setPersonTvShowsToRedis(id, response);

    return response;
  }

  throw new Error("Please provide correct detail");
};

export default fetchPersonAdditional;
