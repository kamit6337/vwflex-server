import airingTodayList from "../../api/query/tvShows/airingTodayList.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getAiringTodayTvShows = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await airingTodayList(page);
    return get;
  }
);
export default getAiringTodayTvShows;
