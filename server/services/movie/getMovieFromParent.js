import fetchMovieDetail from "../../api/query/movie/fetchMovieDetail.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getMovieFromParent = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = parent;

    const get = await fetchMovieDetail(id);
    return get;
  }
);

export default getMovieFromParent;
