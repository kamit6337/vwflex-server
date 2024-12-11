import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTvShowReviews = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;

    const get = await fetchTvShowAdditional(id, {
      reviews: true,
    });

    return get;
  }
);

export default getTvShowReviews;
