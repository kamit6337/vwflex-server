import getUserByEmail from "../../../database/User/getUserByEmail.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import { setNewUserToRedis } from "../../../redis/Auth/auth.js";
import { setUserOtpFromRedis } from "../../../redis/Auth/otp.js";
import catchAsyncError from "../../../lib/catchAsyncError.js";
import sendingEmail from "../../../utils/email/email.js";
import otpTemplate from "../../../utils/email/otpTemplate.js";
import generate8digitOTP from "../../../utils/javaScript/generate8digitOTP.js";

const signup = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new HandleGlobalError("Not provided all field", 404));
  }

  // MARK: CHECK USER IS ALREADY PRESENT OR NOT
  const findUser = await getUserByEmail(email);

  if (findUser) {
    return next(
      new HandleGlobalError(
        "You have already signed up with this Email ID. Please login or signup with different Email ID"
      )
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

  res.json({
    message: "Successfull Send OTP to Email",
  });
});

export default signup;
