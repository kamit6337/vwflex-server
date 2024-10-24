import fetchMovieAdditional from "../../api/query/movie/fetchMovieAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getMovieRecommendations = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page, id } = args;

    const get = await fetchMovieAdditional(id, { recommendations: true, page });

    return get;
  }
);

export default getMovieRecommendations;
