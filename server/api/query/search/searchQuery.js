import { getReq } from "../../../utils/api/api.js";

const searchQuery = async (q, { page = 1 } = {}) => {
  const search = await getReq("/search/multi", {
    params: { query: q, page },
  });

  const movieSearch = search?.results?.filter((obj) => {
    return obj.media_type === "movie";
  });

  const tvSearch = search?.results?.filter((obj) => {
    return obj.media_type === "tv";
  });

  const personSearch = search?.results?.filter((obj) => {
    return obj.media_type === "person";
  });

  const response = {
    movies: movieSearch,
    tv: tvSearch,
    peoples: personSearch,
  };

  return response;
};

export default searchQuery;
