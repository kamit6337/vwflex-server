import User from "../../models/UserModel.js";
import { setUserIntoRedis } from "../../redis/User/user.js";

const patchUserProfile = async (userId, obj) => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      ...obj,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  await setUserIntoRedis(user);

  return user;
};

export default patchUserProfile;
