import popularTvShowsList from "../../api/query/tvShows/popularTvShowsList.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPopularTvShows = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await popularTvShowsList(page);
    return get;
  }
);

export default getPopularTvShows;
