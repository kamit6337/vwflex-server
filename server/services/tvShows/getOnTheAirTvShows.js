import onTheAirList from "../../api/query/tvShows/onTheAirList.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getOnTheAirTvShows = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await onTheAirList(page);
    return get;
  }
);

export default getOnTheAirTvShows;
