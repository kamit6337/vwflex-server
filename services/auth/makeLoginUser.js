import { GraphQLError } from "graphql";
import catchGraphQLError from "../../lib/catchGraphQLError.js";
import getUserByEmail from "../../database/User/getUserByEmail.js";
import { encrypt } from "../../utils/encryption/encryptAndDecrypt.js";

const makeLoginUser = catchGraphQLError(async (parent, args, contextValue) => {
  const { email, password } = args;

  if (!email || !password) {
    throw new GraphQLError("Email or Password is not provided", 404);
  }

  const findUser = await getUserByEmail(email);

  if (!findUser) {
    throw new GraphQLError("Email or Password is incorrect", 404);
  }

  if (!findUser.password) {
    throw new GraphQLError("Please reset your password to login", 404);
  }

  //   MARK: IF USER PASSWORD DOES NOT MATCH WITH HASH PASSWORD, THROW ERROR
  const isPasswordValid = findUser.checkPassword(password); // Boolean

  if (!isPasswordValid) {
    throw new GraphQLError("Email or Password is incorrect", 404);
  }

  //   MARK: USER EMAIL AND PASSWORD IS CONFIRMED, SEND TOKEN AND MAKE LOGIN
  const token = encrypt({
    id: findUser._id,
    role: findUser.role,
  });

  return token;
});

export default makeLoginUser;
