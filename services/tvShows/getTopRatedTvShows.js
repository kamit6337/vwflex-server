import topRatedTvShows from "../../api/query/tvShows/topRatedTvShows.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTopRatedTvShows = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await topRatedTvShows(page);
    return get;
  }
);

export default getTopRatedTvShows;
