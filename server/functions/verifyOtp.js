import { getUserOtpFromRedis } from "../redis/Auth/otp.js";

const verifyOtp = async (email, userOtp) => {
  if (!userOtp || !email) {
    throw new Error("OTP is not provided. Please provide it");
  }

  const actualOtp = await getUserOtpFromRedis(email);

  if (!actualOtp) {
    throw new Error("Time has expired. Please resend to verify");
  }

  if (actualOtp?.toString() !== userOtp?.toString()) {
    throw new Error("OTP is incorrect. Please provide correct OTP");
  }
};

export default verifyOtp;
