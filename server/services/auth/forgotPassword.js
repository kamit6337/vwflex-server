import getUserByEmail from "../../database/User/getUserByEmail.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import { setUserOtpFromRedis } from "../../redis/Auth/otp.js";
import sendingEmail from "../../utils/email/email.js";
import otpTemplate from "../../utils/email/otpTemplate.js";
import generate8digitOTP from "../../utils/javaScript/generate8digitOTP.js";

const forgotPassword = catchGraphQLError(async (parent, args, contextValue) => {
  const { email } = args;

  if (!email) {
    throw new Error("Email is not provided");
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    throw new Error("You are not our customer. Please signup first");
  }

  const otp = generate8digitOTP();

  const html = otpTemplate(otp);

  await setUserOtpFromRedis(email, otp);

  await sendingEmail(email, "OTP for verification", html);

  return "OTP send to Email for verification";
});

export default forgotPassword;
