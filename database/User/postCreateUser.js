import supabaseClient from "../../lib/supabaseClient.js";
import { setUserIntoRedis } from "../../redis/User/user.js";

const postCreateUser = async (obj) => {
  const { data, error } = await supabaseClient.from("user").insert([obj]);

  if (error) {
    throw new Error(error);
  }

  await setUserIntoRedis(data);

  return data;
};

export default postCreateUser;
