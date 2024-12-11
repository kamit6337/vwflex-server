import popularMoviesList from "../../api/query/movies/popularMoviesList.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPopularMovies = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await popularMoviesList(page);

    return get;
  }
);

export default getPopularMovies;
