import { environment } from "../../../utils/environment.js";
import HandleGlobalError from "../../../lib/HandleGlobalError.js";
import catchAsyncError from "../../../lib/catchAsyncError.js";
import { encrypt } from "../../../utils/encryption/encryptAndDecrypt.js";
import getUserByEmail from "../../../database/User/getUserByEmail.js";
import postCreateUser from "../../../database/User/postCreateUser.js";
import uploadProfileImageToS3 from "../../../lib/aws/uploadProfileImageToS3.js";

// NOTE: LOGIN SUCCESS
const OAuthLogin = catchAsyncError(async (req, res, next) => {
  if (!req.user)
    return next(
      new HandleGlobalError("Error in login. Please try again!", 403)
    );

  const {
    id,
    provider,
    _json: { name, email, picture },
  } = req.user;

  let findUser = await getUserByEmail(email);

  if (!findUser) {
    // MARK: IF NOT FIND USER

    const photo = await uploadProfileImageToS3(picture);

    const obj = {
      name,
      email,
      photo,
      OAuthId: id,
      OAuthProvider: provider,
    };

    const createUser = await postCreateUser(obj);

    if (!createUser) {
      return next(new HandleGlobalError("Issue in Signup", 404));
    }

    const token = encrypt({
      id: createUser._id.toString(),
      role: createUser.role,
    });

    res.redirect(`${environment.CLIENT_URL}/oauth?use=${token}`);
    return;
  }

  // MARK: IF FIND USER IS PRESENT
  const token = encrypt({
    id: findUser._id,
    role: findUser.role,
  });

  res.redirect(`${environment.CLIENT_URL}/oauth?use=${token}`);
});

export default OAuthLogin;
