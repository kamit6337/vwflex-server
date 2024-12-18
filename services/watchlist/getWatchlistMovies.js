import getUserWatchlistMovies from "../../database/Watchlist/getUserWatchlistMovies.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const getWatchlistMovies = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { page } = args;

    const get = await getUserWatchlistMovies(user._id, page);
    return get;
  }
);

export default getWatchlistMovies;
