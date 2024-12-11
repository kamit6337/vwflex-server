import forgotPassword from "../../services/auth/forgotPassword.js";
import getLoginCheck from "../../services/auth/getLoginCheck.js";
import makeLoginUser from "../../services/auth/makeLoginUser.js";
import makeUserSignUp from "../../services/auth/makeUserSignUp.js";
import makeUserSignUpFinal from "../../services/auth/makeUserSignUpFinal.js";
import newPassword from "../../services/auth/newPassword.js";
import otpVerification from "../../services/auth/otpVerification.js";
import resendOtpToEmail from "../../services/auth/resendOtpToEmail.js";

const authResolvers = {
  Query: {
    getLoginCheck: getLoginCheck,
  },

  Mutation: {
    loginUser: makeLoginUser,
    signUpUserInitial: makeUserSignUp,
    signUpUserFinal: makeUserSignUpFinal,
    resendOtp: resendOtpToEmail,
    forgotPassword: forgotPassword,
    otpVerification: otpVerification,
    newPassword: newPassword,
  },
};

export default authResolvers;
