import getUserByEmail from "../../database/User/getUserByEmail.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import { setUserIdIntoRedis } from "../../redis/Auth/auth.js";
import sendingEmail from "../../utils/email/email.js";
import resetPasswordLinkTemplate from "../../utils/email/resetPasswordLinkTemplate.js";
import { environment } from "../../utils/environment.js";
import generateResetToken from "../../utils/generateResetToken.js";

const forgotPassword = catchGraphQLError(async (parent, args, contextValue) => {
  const { email } = args;

  if (!email) {
    throw new Error("Email is not provided");
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    throw new Error("You are not our customer. Please signup first");
  }

  const secretToken = generateResetToken();

  const url = `${environment.CLIENT_URL}/newPassword?resetToken=${secretToken}`;

  const html = resetPasswordLinkTemplate(url);

  await sendingEmail(email, "Reset Password", html);

  await setUserIdIntoRedis(secretToken, findUser._id);

  return "OTP send to Email for verification";
});

export default forgotPassword;
