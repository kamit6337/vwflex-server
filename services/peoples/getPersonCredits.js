import fetchPersonAdditional from "../../api/query/peoples/fetchPersonAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPersonCredits = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;

    const get = await fetchPersonAdditional(id, { credits: true });

    return get;
  }
);
export default getPersonCredits;
