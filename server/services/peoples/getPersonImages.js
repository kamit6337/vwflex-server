import fetchPersonAdditional from "../../api/query/peoples/fetchPersonAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPersonImages = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;

    const get = await fetchPersonAdditional(id, { images: true });

    return get;
  }
);

export default getPersonImages;
