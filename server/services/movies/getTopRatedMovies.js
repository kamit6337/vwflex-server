import topRatedMoviesList from "../../api/query/movies/topRatedMoviesList.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTopRatedMovies = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await topRatedMoviesList(page);

    return get;
  }
);

export default getTopRatedMovies;
