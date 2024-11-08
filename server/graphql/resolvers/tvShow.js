import getTrendingTvShows from "../../services/trending/getTrendingTvShows.js";
import getAiringTodayTvShows from "../../services/tvShows/getAiringTodayTvShows.js";
import getOnTheAirTvShows from "../../services/tvShows/getOnTheAirTvShows.js";
import getPopularTvShows from "../../services/tvShows/getPopularTvShows.js";
import getTopRatedTvShows from "../../services/tvShows/getTopRatedTvShows.js";
import getTvShowDetails from "../../services/tvShowSingle/getTvShowDetails.js";
import getTvShowImage from "../../services/tvShowSingle/getTvShowImage.js";
import getTvShowRecommendation from "../../services/tvShowSingle/getTvShowRecommendation.js";

import getTvShowReviews from "../../services/tvShowSingle/getTvShowReviews.js";
import getTvShowSeason from "../../services/tvShowSingle/getTvShowSeason.js";
import getTvShowSimilar from "../../services/tvShowSingle/getTvShowSimilar.js";

const tvShowResolver = {
  Query: {
    getTrendingTvShows: getTrendingTvShows,
    getAiringTodayTvShows: getAiringTodayTvShows,
    getOnTheAirTvShows: getOnTheAirTvShows,
    getPopularTvShows: getPopularTvShows,
    getTopRatedTvShows: getTopRatedTvShows,
    getTvShowDetails: getTvShowDetails,
    getTvShowSeason: getTvShowSeason,
    getTvShowRecommendation: getTvShowRecommendation,
    getTvShowSimilar: getTvShowSimilar,
    getTvShowImage: getTvShowImage,
    getTvShowReviews: getTvShowReviews,
  },
};

export default tvShowResolver;
