import {
  getPersonDetailFromRedis,
  setPersonDetailIntoRedis,
} from "../../../redis/Peoples/personDetailFromRedis.js";
import { getReq } from "../../../utils/api/api.js";

const fetchPersonDetails = async (id) => {
  const get = await getPersonDetailFromRedis(id);

  if (get) {
    return get;
  }

  const person = await getReq(`/person/${id}`);

  await setPersonDetailIntoRedis(person);

  return person;
};

export default fetchPersonDetails;
