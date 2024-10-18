import patchUserProfile from "../../../database/User/patchUserProfile.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import catchAsyncError from "../../../lib/catchAsyncError.js";
import { decrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import bcrypt from "bcryptjs";

const newPassword = catchAsyncError(async (req, res, next) => {
  const { email, token, password } = req.body;

  if (!email || !token || !password) {
    return next(new HandleGlobalError("All fields is required", 404));
  }

  const decoded = decrypt(token);

  const currentDate = Date.now();

  if (currentDate > decoded.exp) {
    return next(
      new HandleGlobalError(
        "It's time out. Click again on Forgot Password to send link",
        404
      )
    );
  }

  if (email !== decoded.email) {
    return next(new HandleGlobalError("Issue in create new Password", 404));
  }

  const hashPassword = bcrypt.hashSync(password, 12);

  const obj = {
    password: hashPassword,
    updatedAt: Date.now(),
  };

  await patchUserProfile(decoded.id, obj);

  res.json({
    message: "Password has been updated",
  });
});

export default newPassword;
