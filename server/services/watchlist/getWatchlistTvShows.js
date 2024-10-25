import getUserWatchlistTvShows from "../../database/Watchlist/getUserWatchlistTvShows.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const getWatchlistTvShows = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const get = await getUserWatchlistTvShows(user._id);
    return get;
  }
);

export default getWatchlistTvShows;
