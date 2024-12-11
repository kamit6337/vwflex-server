import deleteUserWatchlistMovie from "../../database/Watchlist/deleteUserWatchlistMovie.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const deleteWatchlistMovie = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { id } = args;
    const bool = await deleteUserWatchlistMovie(user._id, id);
    return {
      id,
      bool,
    };
  }
);

export default deleteWatchlistMovie;
