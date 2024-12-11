import fetchMovieAdditional from "../../api/query/movie/fetchMovieAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getMovieReviews = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;
    const get = await fetchMovieAdditional(id, { reviews: true });
    return get;
  }
);

export default getMovieReviews;
