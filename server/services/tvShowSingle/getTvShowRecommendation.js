import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTvShowRecommendation = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id, page } = args;

    const get = await fetchTvShowAdditional(id, {
      recommendations: true,
      page,
    });

    return get;
  }
);

export default getTvShowRecommendation;
