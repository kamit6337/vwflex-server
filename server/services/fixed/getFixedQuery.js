import getFixed from "../../api/query/fixed/getFixed.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getFixedQuery = catchGraphQLError(async (parent, args, contextValue) => {
  const get = await getFixed();
  return get;
});

export default getFixedQuery;
