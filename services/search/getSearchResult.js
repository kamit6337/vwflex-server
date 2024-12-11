import searchQuery from "../../api/query/search/searchQuery.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getSearchResult = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { q } = args;

    const get = await searchQuery(q);
    return get;
  }
);

export default getSearchResult;
