import fetchPersonAdditional from "../../api/query/peoples/fetchPersonAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPersonMovieCredits = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;

    const get = await fetchPersonAdditional(id, { movies: true });

    return get;
  }
);

export default getPersonMovieCredits;
