import User from "../../models/UserModel.js";

const getUserById = async (id) => {
  const findUser = await User.findOne({
    _id: id,
  });

  return findUser;
};

export default getUserById;
