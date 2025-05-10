import patchUserProfile from "../../database/User/patchUserProfile.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import bcrypt from "bcryptjs";

const newPassword = catchGraphQLError(async (parent, args, contextValue) => {
  const { resetToken, password } = args;

  if (!resetToken || !password) {
    throw new Error("Email and Password is required");
  }

  const userId = await getUserIdFromRedis(resetToken);

  if (!userId) {
    throw new Error("Issue in Resetting Password. Try again later", 404);
  }

  const hashPassword = bcrypt.hashSync(password, 12);

  const obj = {
    password: hashPassword,
    updatedAt: Date.now(),
  };

  await patchUserProfile(userId, obj);

  return "Password has been updated";
});

export default newPassword;
