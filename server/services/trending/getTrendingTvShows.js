import trendingTvShows from "../../api/query/trending/trendingTvShows.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTrendingTvShows = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { time } = args;

    const get = await trendingTvShows(time);

    return get;
  }
);

export default getTrendingTvShows;
