import postTvShowsIntoWatchlist from "../../database/Watchlist/postTvShowsIntoWatchlist.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const postWatchlistMovie = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { id, season } = args;
    const get = await postTvShowsIntoWatchlist(user._id, id, season);
    return get;
  }
);

export default postWatchlistMovie;
