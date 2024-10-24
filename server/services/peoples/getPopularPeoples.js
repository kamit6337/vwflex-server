import popularPeoples from "../../api/query/peoples/popularPeoples.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getPopularPeoples = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { page } = args;

    const get = await popularPeoples(page);

    return get;
  }
);

export default getPopularPeoples;
