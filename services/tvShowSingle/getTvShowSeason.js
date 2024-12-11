import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTvShowSeason = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id, season } = args;

    const get = await fetchTvShowAdditional(id, { season });

    return get;
  }
);

export default getTvShowSeason;
