import fetchMovieAdditional from "../../api/query/movie/fetchMovieAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getSimilarMovies = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page, id } = args;

    const get = await fetchMovieAdditional(id, { similar: true, page });

    return get;
  }
);

export default getSimilarMovies;
