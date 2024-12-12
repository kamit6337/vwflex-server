import postCreateUser from "../../database/User/postCreateUser.js";
import verifyOtp from "../../functions/verifyOtp.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import { getNewUserByRedis } from "../../redis/Auth/auth.js";
import { encrypt } from "../../utils/encryption/encryptAndDecrypt.js";

const makeUserSignUpFinal = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { otp, email } = args;

    await verifyOtp(email, otp);

    const user = await getNewUserByRedis(email);

    if (!user) {
      throw new Error("Something went wrong in signup. Please try later");
    }

    const { name, password } = user;

    const profilePicUrl = `https://ui-avatars.com/api/?background=random&name=${name}&size=128&bold=true`;

    const obj = {
      name,
      email,
      password,
      photo: profilePicUrl,
    };

    const createUser = await postCreateUser(obj);

    if (!createUser) {
      throw new Error("Issue in Signup. Please try later", 404);
    }

    const token = encrypt({
      id: createUser._id.toString(),
      role: createUser.role,
    });

    return token;
  }
);

export default makeUserSignUpFinal;
