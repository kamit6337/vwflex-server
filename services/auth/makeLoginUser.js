import { GraphQLError } from "graphql";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import getUserByEmail from "../../database/User/getUserByEmail.js";
import { encrypt } from "../../utils/encryption/encryptAndDecrypt.js";
import verifyUserPassword from "../../lib/verifyUserPassword.js";

const makeLoginUser = catchGraphQLError(async (parent, args, contextValue) => {
  const { email, password } = args;

  if (!email || !password) {
    throw new GraphQLError("Email or Password is not provided");
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    throw new GraphQLError("Email is incorrect");
  }

  if (!findUser.password) {
    throw new GraphQLError("Please reset your password to login");
  }

  //   MARK: IF USER PASSWORD DOES NOT MATCH WITH HASH PASSWORD, THROW ERROR
  const isPasswordValid = verifyUserPassword(findUser.password, password);

  if (!isPasswordValid) {
    throw new GraphQLError("Password is incorrect");
  }

  //   MARK: USER EMAIL AND PASSWORD IS CONFIRMED, SEND TOKEN AND MAKE LOGIN
  const token = encrypt({
    id: findUser._id,
    role: findUser.role,
  });

  return token;
});

export default makeLoginUser;
