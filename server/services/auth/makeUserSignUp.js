import { GraphQLError } from "graphql";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import getUserByEmail from "../../database/User/getUserByEmail.js";
import generate8digitOTP from "../../utils/javaScript/generate8digitOTP.js";
import otpTemplate from "../../utils/email/otpTemplate.js";
import { setNewUserToRedis } from "../../redis/Auth/auth.js";
import { setUserOtpFromRedis } from "../../redis/Auth/otp.js";
import sendingEmail from "../../utils/email/email.js";

const makeUserSignUp = catchGraphQLError(async (parent, args, contextValue) => {
  const { name, email, password } = args;

  if (!name || !email || !password) {
    throw new GraphQLError("Not provided all field", 404);
  }

  // MARK: CHECK USER IS ALREADY PRESENT OR NOT
  const findUser = await getUserByEmail(email);

  if (findUser) {
    throw new GraphQLError(
      "You have already signed up with this Email ID. Please login or signup with different Email ID"
    );
  }

  const otp = generate8digitOTP();

  const html = otpTemplate(otp);

  const obj = {
    name,
    email,
    password,
  };

  await setNewUserToRedis(email, obj);
  await setUserOtpFromRedis(email, otp);

  await sendingEmail(email, "OTP for verification", html);

  return "Successfull Send OTP to Email";
});

export default makeUserSignUp;
