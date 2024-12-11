import fetchPersonDetails from "../../api/query/peoples/fetchPersonDetails.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPersonDetail = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;

    const get = await fetchPersonDetails(id);

    return get;
  }
);

export default getPersonDetail;
