import postCreateUser from "../../../database/User/postCreateUser.js";
import catchAsyncError from "../../../lib/catchAsyncError.js";
import { encrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import { getUserOtpFromRedis } from "../../../redis/Auth/otp.js";
import { getNewUserByRedis } from "../../../redis/Auth/auth.js";
import verifyOtp from "../../../functions/verifyOtp.js";

const verifySignup = catchAsyncError(async (req, res, next) => {
  const { otp, email } = req.body;

  await verifyOtp(email, otp);

  const user = await getNewUserByRedis(email);

  if (!user) {
    return next(
      new HandleGlobalError("Something went wrong in signup. Please try later")
    );
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
    return next(
      new HandleGlobalError("Issue in Signup. Please try later", 404)
    );
  }

  const token = encrypt({
    id: createUser._id,
    role: createUser.role,
  });

  res.json(token);
});

export default verifySignup;
