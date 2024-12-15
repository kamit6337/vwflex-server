import getUserWatchlistTvShows from "../../database/Watchlist/getUserWatchlistTvShows.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import Req from "../../utils/Req.js";

const getWatchlistTvShows = catchGraphQLError(
  async (parent, args, contextValue) => {
    const user = await Req(contextValue.req);

    const get = await getUserWatchlistTvShows(user._id);

    if (!get || get.length === 0) return get;

    const updateTvId = get.map((obj) => {
      const { id, season_number } = obj;
      obj.id = `${id}-${season_number}`;
      return obj;
    });

    return updateTvId;
  }
);

export default getWatchlistTvShows;
