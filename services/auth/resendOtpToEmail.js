import { GraphQLError } from "graphql";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import generate8digitOTP from "../../utils/javaScript/generate8digitOTP.js";
import otpTemplate from "../../utils/email/otpTemplate.js";
import { setUserOtpFromRedis } from "../../redis/Auth/otp.js";
import sendingEmail from "../../utils/email/email.js";

const resendOtpToEmail = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { email } = args;

    if (!email) {
      throw new GraphQLError(
        "Something went wrong on resending OTP. Please try later"
      );
    }

    const newOtp = generate8digitOTP();

    const html = otpTemplate(newOtp);

    await setUserOtpFromRedis(email, newOtp);

    await sendingEmail(email, "OTP for verification", html);

    return "Successfull Re-Send OTP to Email";
  }
);

export default resendOtpToEmail;
