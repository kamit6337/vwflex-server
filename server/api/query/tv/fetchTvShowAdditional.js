import {
  getTvShowRecommendations,
  getTvShowSeasonFromRedis,
  getTvShowsImagesFromRedis,
  getTvShowSimilar,
  getTvShowsReviewsFromRedis,
  setTvShowRecommendations,
  setTvShowSeasonIntoRedis,
  setTvShowsImagesToRedis,
  setTvShowSimilar,
  setTvShowsReviewsToRedis,
} from "../../../redis/TvShows/tvShowAdditionalFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const fetchTvShowAdditional = async (
  id,
  {
    season = null,
    recommendations = false,
    similar = false,
    images = false,
    reviews = false,
    page = 1,
  }
) => {
  if (!id) {
    throw new Error("ID is not provided");
  }

  if (season) {
    const get = await getTvShowSeasonFromRedis(id, season);
    if (get) {
      return get;
    }

    const tvSeason = await getReq(`/tv/${id}/season/${season}`);
    await setTvShowSeasonIntoRedis(id, season, tvSeason);
    return tvSeason;
  }

  if (reviews) {
    const get = await getTvShowsReviewsFromRedis(id);
    if (get) {
      return get;
    }

    let tvShowReviews = await getReq(`/tv/${id}/reviews`, {
      params: { page },
    });

    const response = tvShowReviews.results;
    await setTvShowsReviewsToRedis(id, response);
    return response;
  }

  if (images) {
    const get = await getTvShowsImagesFromRedis(id);
    if (get) {
      return get;
    }

    const tvShowImages = await getReq(`/tv/${id}/images`);

    const imageList = [...tvShowImages?.backdrops]?.map((obj) => {
      const { aspect_ratio: ratio, file_path: path } = obj;
      return { ratio, path };
    });

    await setTvShowsImagesToRedis(imageList);
    return imageList;
  }

  if (recommendations) {
    const get = await getTvShowRecommendations(id, page);
    if (get) {
      return get;
    }

    const recommendationTvShow = await getReq(`/tv/${id}/recommendations`, {
      params: { page },
    });

    const response = recommendationTvShow?.results;
    await setTvShowRecommendations(id, response);
    return response;
  }

  if (similar) {
    const get = await getTvShowSimilar(id, page);
    if (get) {
      return get;
    }

    const similarTvShow = await getReq(`/tv/${id}/similar`, {
      params: { page },
    });

    const response = similarTvShow?.results;
    await setTvShowSimilar(id, response);
    return response;
  }

  throw new Error("Please check you provided arguments");
};

export default fetchTvShowAdditional;
