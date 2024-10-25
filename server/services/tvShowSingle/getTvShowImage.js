import fetchTvShowAdditional from "../../api/query/tv/fetchTvShowAdditional.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const getTvShowImage = catchGraphQLError(async (parent, args, contextValue) => {
  const { id } = args;

  const get = await fetchTvShowAdditional(id, {
    images: true,
  });

  return get;
});

export default getTvShowImage;
