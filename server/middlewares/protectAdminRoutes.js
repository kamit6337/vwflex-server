import HandleGlobalError from "../utils/HandleGlobalError.js";
import catchAsyncError from "../lib/catchAsyncError.js";
import Req from "../utils/Req.js";
import { decrypt } from "../utils/encryption/encryptAndDecrypt.js";
import getUserById from "../database/User/getUserById.js";

const protectAdminRoutes = catchAsyncError(async (req, res, next) => {
  const { token } = Req(req);

  if (!token) {
    return next(new HandleGlobalError("UnAuthorised Access", 403));
  }

  const decodedId = decrypt(token);

  const findUser = await getUserById(decodedId.id);

  if (!findUser) {
    return next(new HandleGlobalError("UnAuthorised Access", 403));
  }

  if (!(findUser.role === "admin" && decodedId.role === "admin")) {
    return next(new HandleGlobalError("UnAuthorised Access", 403));
  }

  req.userId = String(findUser._id);
  req.user = findUser;

  next();
});

export default protectAdminRoutes;
