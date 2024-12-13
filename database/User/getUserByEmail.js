import supabaseClient from "../../lib/supabaseClient.js";
import {
  getUserByEmailRedis,
  setUserIntoRedis,
} from "../../redis/User/user.js";

const getUserByEmail = async (email) => {
  // const get = await getUserByEmailRedis(email);

  // if (get) {
  //   return get;
  // }

  console.log("email", email);

  const { data, error } = await supabaseClient.from("users").select("*");

  console.log("Data", data);
  if (error) {
    throw new Error(`GET USER BY EMAIL error  : ${error}`);
  }

  // await setUserIntoRedis(data);

  return data[0];
};

export default getUserByEmail;
