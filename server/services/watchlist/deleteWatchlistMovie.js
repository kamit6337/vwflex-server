import deleteUserWatchlistMovie from "../../database/Watchlist/deleteUserWatchlistMovie.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const deleteWatchlistMovie = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { id } = args;
    const get = await deleteUserWatchlistMovie(user._id, id);
    return get;
  }
);

export default deleteWatchlistMovie;
