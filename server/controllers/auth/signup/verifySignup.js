import postCreateUser from "../../../database/User/postCreateUser.js";
import catchAsyncError from "../../../lib/catchAsyncError.js";
import { encrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import { getUserOtpFromRedis } from "../../../redis/Auth/otp.js";
import { getNewUserByRedis } from "../../../redis/Auth/auth.js";

const verifySignup = catchAsyncError(async (req, res, next) => {
  const { otp: userOtp, email } = req.body;

  if (!userOtp || !email) {
    return next(
      new HandleGlobalError("OTP is not provided. Please provide it")
    );
  }

  const actualOtp = await getUserOtpFromRedis(email);

  if (!actualOtp) {
    return next(
      new HandleGlobalError("Time has expired. Please resend to verify")
    );
  }

  if (otp !== +userOtp) {
    return next(
      new HandleGlobalError("OTP is incorrect. Please provide correct OTP")
    );
  }

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
