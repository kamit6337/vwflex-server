import fetchPersonAdditional from "../../api/query/peoples/fetchPersonAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPersonTvCredits = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;

    const get = await fetchPersonAdditional(id, { tv: true });
    return get;
  }
);

export default getPersonTvCredits;
