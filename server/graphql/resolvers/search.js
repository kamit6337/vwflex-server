import getSearchResult from "../../services/search/getSearchResult.js";

const searchResolver = {
  Query: {
    getSearchResult: getSearchResult,
  },
};

export default searchResolver;
