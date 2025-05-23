import postTvShowsIntoWatchlist from "../../database/Watchlist/postTvShowsIntoWatchlist.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const postWatchlistTvShow = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const { id, season } = args;
    const bool = await postTvShowsIntoWatchlist(user._id, id, season);

    return {
      id: `${id}-${season}`,
      bool,
    };
  }
);

export default postWatchlistTvShow;
