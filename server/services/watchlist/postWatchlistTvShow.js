import postMovieIntoWatchlist from "../../database/Watchlist/postMovieIntoWatchlist.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const postWatchlistTvShow = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { id } = args;
    const get = await postMovieIntoWatchlist(user._id, id);
    return get;
  }
);

export default postWatchlistTvShow;
