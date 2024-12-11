import {
  getMovieImagesFromRedis,
  getMovieRecommendations,
  getMovieReviewsFromRedis,
  getMovieSimilar,
  setMovieImagesToRedis,
  setMovieRecommendations,
  setMovieReviewsToRedis,
  setMovieSimilar,
} from "../../../redis/Movies/movieAdditionalFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const fetchMovieAdditional = async (
  id,
  {
    recommendations = false,
    reviews = false,
    images = false,
    similar = false,
    page = 1,
  }
) => {
  if (!id) {
    throw new Error("ID is not provided");
  }

  // NOTE: RECOMMENDATIONS
  if (recommendations) {
    const get = await getMovieRecommendations(id, page);
    if (get) {
      return get;
    }
    const movieRecommendations = await getReq(`/movie/${id}/recommendations`, {
      params: { page },
    });
    const response = movieRecommendations?.results;
    await setMovieRecommendations(id, response);
    return response;
  }

  if (images) {
    const get = await getMovieImagesFromRedis(id);

    if (get) {
      return get;
    }

    const fetchMovieImages = await getReq(`/movie/${id}/images`);
    const modifyMovieImages = fetchMovieImages?.backdrops?.map((obj) => {
      const { aspect_ratio: ratio, file_path: path } = obj;
      return { ratio, path };
    });

    await setMovieImagesToRedis(modifyMovieImages);
    return modifyMovieImages;
  }

  if (reviews) {
    const get = await getMovieReviewsFromRedis(id);

    if (get) {
      return get;
    }

    let movieReviews = await getReq(`/movie/${id}/reviews`, {
      params: { page },
    });

    movieReviews = movieReviews?.results;
    await setMovieReviewsToRedis(id, movieReviews);
    return movieReviews;
  }

  if (similar) {
    const get = await getMovieSimilar(id, page);
    if (get) {
      return get;
    }

    let similarMovie = await getReq(`/movie/${id}/similar`, {
      params: { page },
    });
    similarMovie = similarMovie?.results;
    await setMovieSimilar(id, similarMovie);
    return similarMovie;
  }

  throw new Error("Please check you provided arguments");
};

export default fetchMovieAdditional;
