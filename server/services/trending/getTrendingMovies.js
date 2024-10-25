import trendingMovies from "../../api/query/trending/trendingMovies.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTrendingMovies = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { time } = args;

    const get = await trendingMovies(time);
    return get;
  }
);

export default getTrendingMovies;
