import {
  getFixedFromRedis,
  setFixedToRedis,
} from "../../../redis/Fixed/fixed.js";
import { getReq } from "../../../utils/api/api.js";

const getFixed = async () => {
  const get = await getFixedFromRedis();

  if (get) {
    return get;
  }

  const response = {};

  const [images, movieGenres, tvGenres, countries] = await Promise.all([
    getReq("/configuration"),
    getReq("/genre/movie/list"),
    getReq("/genre/tv/list"),
    getReq("/configuration/countries"),
  ]);

  response.imageDetail = images.images;
  const newGenres = new Set([...movieGenres.genres, ...tvGenres.genres]);
  response.genres = [...newGenres];
  response.countries = countries;

  await setFixedToRedis(response);

  return response;
};

export default getFixed;
