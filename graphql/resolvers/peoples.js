import getPersonDetail from "../../services/peoples/getPersonDetail.js";
import getPersonImages from "../../services/peoples/getPersonImages.js";
import getPersonMovieCredits from "../../services/peoples/getPersonMovieCredits.js";
import getPersonTvCredits from "../../services/peoples/getPersonTvCredits.js";
import getPopularPeoples from "../../services/peoples/getPopularPeoples.js";
import getTrendingPeoples from "../../services/trending/getTrendingPeoples.js";

const peoplesResolver = {
  KnownFor: {
    __resolveType(obj) {
      if (obj.title) {
        return "Movie";
      } else if (obj.name) {
        return "TV";
      }
      return null;
    },
  },
  Query: {
    getPopularPeoples: getPopularPeoples,
    getPersonDetail: getPersonDetail,
    getPersonImages: getPersonImages,
    getPersonMovieCredits: getPersonMovieCredits,
    getPersonTvCredits: getPersonTvCredits,
    getTrendingPeoples: getTrendingPeoples,
  },
};

export default peoplesResolver;
