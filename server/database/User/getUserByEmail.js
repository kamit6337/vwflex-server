import User from "../../models/UserModel.js";
import {
  getUserByEmailRedis,
  setUserIntoRedis,
} from "../../redis/User/user.js";

const getUserByEmail = async (email) => {
  const get = await getUserByEmailRedis(email);

  if (get) {
    return get;
  }

  const findUser = await User.findOne({ email });

  await setUserIntoRedis(findUser);

  return findUser;
};

export default getUserByEmail;
