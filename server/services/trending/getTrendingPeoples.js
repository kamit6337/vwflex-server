import trendingPeoples from "../../api/query/trending/trendingPeoples.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTrendingPeoples = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { time } = args;

    const get = await trendingPeoples(time);
    return get;
  }
);

export default getTrendingPeoples;
