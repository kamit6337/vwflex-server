import catchAsyncError from "../../../lib/catchAsyncError.js";
import sendingEmail from "../../../utils/email/email.js";
import otpTemplate from "../../../utils/email/otpTemplate.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import generate8digitOTP from "../../../utils/javaScript/generate8digitOTP.js";
import { setUserOtpFromRedis } from "../../../redis/Auth/otp.js";

const resendOtp = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(
      new HandleGlobalError(
        "Something went wrong on resending OTP. Please try later"
      )
    );
  }

  const newOtp = generate8digitOTP();

  const html = otpTemplate(newOtp);

  await setUserOtpFromRedis(email, newOtp);

  await sendingEmail(email, "OTP for verification", html);

  res.json({
    message: "Successfull Re-Send OTP to Email",
  });
});
export default resendOtp;
