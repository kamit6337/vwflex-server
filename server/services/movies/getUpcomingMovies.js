import upcomingMoviesList from "../../api/query/movies/upcomingMoviesList.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getUpcomingMovies = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await upcomingMoviesList(page);
    return get;
  }
);

export default getUpcomingMovies;
