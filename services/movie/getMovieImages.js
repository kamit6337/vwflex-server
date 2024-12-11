import fetchMovieAdditional from "../../api/query/movie/fetchMovieAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getMovieImages = catchGraphQLError(async (parent, args, contextValue) => {
  const { id } = args;
  const get = await fetchMovieAdditional(id, { images: true });
  return get;
});

export default getMovieImages;
