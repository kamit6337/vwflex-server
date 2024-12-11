import fetchMovieDetail from "../../api/query/movie/fetchMovieDetail.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getMovie = catchGraphQLError(async (parent, { id }, contextValue) => {
  const get = await fetchMovieDetail(id);
  return get;
});

export default getMovie;
