import nowPlayingMoviesList from "../../api/query/movies/nowPlayingMoviesList.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getNowPlaying = catchGraphQLError(async (parent, args, contextValue) => {
  const get = await nowPlayingMoviesList();
  return get;
});

export default getNowPlaying;
