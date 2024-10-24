import getPopularPeoples from "../../services/peoples/getPopularPeoples.js";

const peoplesResolver = {
  Query: {
    getPopularPeoples: getPopularPeoples,
  },
};

export default peoplesResolver;
