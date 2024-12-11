import deleteUserWatchlistTvShow from "../../database/Watchlist/deleteUserWatchlistTvShow.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const deleteWatchlistTvShow = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);
    const { id, season } = args;
    const bool = await deleteUserWatchlistTvShow(user._id, id, season);

    return {
      id: `${id}${season}`,
      bool,
    };
  }
);

export default deleteWatchlistTvShow;
