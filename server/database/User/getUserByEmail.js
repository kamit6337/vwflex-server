import User from "../../models/UserModel.js";

const getUserByEmail = async (email) => {
  const findUser = await User.findOne({ email }).select("+password");
  return findUser;
};

export default getUserByEmail;
