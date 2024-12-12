import supabaseClient from "../../lib/supabaseClient.js";
import {
  getUserByEmailRedis,
  setUserIntoRedis,
} from "../../redis/User/user.js";

const getUserByEmail = async (email) => {
  const get = await getUserByEmailRedis(email);

  if (get) {
    return get;
  }

  const { data, error } = await supabaseClient
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    throw new Error(error);
  }

  await setUserIntoRedis(data);

  return data;
};

export default getUserByEmail;
