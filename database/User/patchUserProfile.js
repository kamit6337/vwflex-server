import supabaseClient from "../../lib/supabaseClient.js";
import { setUserIntoRedis } from "../../redis/User/user.js";

const patchUserProfile = async (userId, obj) => {
  const { data, error } = await supabaseClient
    .from("user")
    .update(obj)
    .eq("id", userId);

  if (error) {
    throw new Error(error);
  }

  await setUserIntoRedis(data);

  return data;
};

export default patchUserProfile;
