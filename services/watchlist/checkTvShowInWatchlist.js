import isTvInWatchlist from "../../database/Watchlist/isTvInWatchlist.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const checkTvShowInWatchlist = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { id, season } = args;

    const get = await isTvInWatchlist(user._id, id, season);
    return get;
  }
);

export default checkTvShowInWatchlist;
