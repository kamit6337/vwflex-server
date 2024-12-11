import {
  getTvShowDetailFromRedis,
  setTvShowDetailIntoRedis,
} from "../../../redis/TvShows/tvDetailFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const fetchTvShowDetails = async (id) => {
  const get = await getTvShowDetailFromRedis(id);

  if (get) {
    return get;
  }

  const response = await getReq(`/tv/${id}`);

  await setTvShowDetailIntoRedis(response);

  return response;
};

export default fetchTvShowDetails;
