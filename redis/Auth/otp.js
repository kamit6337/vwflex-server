import redisClient from "../redisClient.js";

export const getUserOtpFromRedis = async (email) => {
  const get = await redisClient.get(`OTP-Verification:${email}`);
  return get;
};

export const setUserOtpFromRedis = async (email, otp) => {
  if (!email || !otp) return;

  await redisClient.set(`OTP-Verification:${email}`, otp, "EX", 600);
};
