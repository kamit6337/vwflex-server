import hashUserPassword from "../../lib/hashUserPassword.js";
import supabaseClient from "../../lib/supabaseClient.js";
import { setUserIntoRedis } from "../../redis/User/user.js";

const postCreateUser = async (obj) => {
  const userObj = hashUserPassword(obj);

  const { data, error } = await supabaseClient
    .from("users")
    .insert([userObj])
    .select()
    .single();

  if (error) {
    throw new Error(error);
  }

  await setUserIntoRedis(data);

  return data;
};

export default postCreateUser;
