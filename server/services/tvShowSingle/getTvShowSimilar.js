import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTvShowSimilar = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id, page } = args;

    const get = await fetchTvShowAdditional(id, {
      similar: true,
      page,
    });

    return get;
  }
);

export default getTvShowSimilar;
