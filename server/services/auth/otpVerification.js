import verifyOtp from "../../functions/verifyOtp.js";
import catchGraphQLError from "../../lib/catchGraphQLError.js";

const otpVerification = catchGraphQLError(
  async (parent, args, contextValue) => {
    const { otp, email } = args;

    await verifyOtp(email, otp);

    return "OTP verify successfully";
  }
);

export default otpVerification;
