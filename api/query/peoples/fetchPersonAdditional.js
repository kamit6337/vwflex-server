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
  { images = false, credits = false }
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

  if (credits) {
    let response = {};

    const getMovies = await getPersonMoviesFromRedis(id);
    const getTvShows = await getPersonTvShowsFromRedis(id);

    if (getTvShows) {
      response.tv = getTvShows;
    } else {
      const personTvCredits = await getReq(`/person/${id}/tv_credits`);
      const res = personTvCredits?.cast;
      await setPersonTvShowsToRedis(id, res);
      response.tv = res;
    }

    if (getMovies) {
      response.movies = getMovies;
    } else {
      const personMovieCredits = await getReq(`/person/${id}/movie_credits`);
      const res = personMovieCredits?.cast;
      await setPersonMovieToRedis(id, res);
      response.movies = res;
    }

    return response;
  }

  throw new Error("Please provide correct detail");
};

export default fetchPersonAdditional;
