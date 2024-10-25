import fetchTvShowDetails from "../../api/query/tv/fetchTvShowDetails.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTvShowDetails = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { id } = args;

    const get = await fetchTvShowDetails(id);
    return get;
  }
);

export default getTvShowDetails;
