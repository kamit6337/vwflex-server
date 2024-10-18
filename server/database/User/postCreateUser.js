import User from "../../models/UserModel.js";

const postCreateUser = async (obj) => {
  const createUser = await User.create({
    ...obj,
  });

  return createUser;
};

export default postCreateUser;
