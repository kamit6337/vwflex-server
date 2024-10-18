import User from "../../models/UserModel.js";

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

  return user;
};

export default patchUserProfile;
