import getPersonCredits from "../../services/peoples/getPersonCredits.js";
import getPersonDetail from "../../services/peoples/getPersonDetail.js";
import getPersonImages from "../../services/peoples/getPersonImages.js";
import getPopularPeoples from "../../services/peoples/getPopularPeoples.js";
import getTrendingPeoples from "../../services/trending/getTrendingPeoples.js";

const peoplesResolver = {
  Query: {
    getPopularPeoples: getPopularPeoples,
    getPersonDetail: getPersonDetail,
    getPersonImages: getPersonImages,
    getPersonCredits: getPersonCredits,
    getTrendingPeoples: getTrendingPeoples,
  },
};

export default peoplesResolver;
