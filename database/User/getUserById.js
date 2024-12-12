import supabaseClient from "../../lib/supabaseClient.js";
import { getUserByIdRedis, setUserIntoRedis } from "../../redis/User/user.js";

const getUserById = async (userId) => {
  const get = await getUserByIdRedis(userId);
  if (get) {
    return get;
  }

  const { data, error } = await supabaseClient
    .from("user")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error);
  }

  await setUserIntoRedis(data);

  return data;
};

export default getUserById;
