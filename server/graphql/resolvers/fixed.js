import getFixedQuery from "../../services/fixed/getFixedQuery.js";

const fixedResolvers = {
  Query: {
    getFixed: getFixedQuery,
  },
};

export default fixedResolvers;
