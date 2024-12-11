import isMovieInWatchlist from "../../database/Watchlist/isMovieInWatchlist.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const checkMovieInWatchlist = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { id } = args;

    const bool = await isMovieInWatchlist(user._id, id);
    return {
      id,
      bool,
    };
  }
);

export default checkMovieInWatchlist;
