import getUserById from "../database/User/getUserById.js";
import { decrypt } from "./encryption/encryptAndDecrypt.js";

const BEARER = "Bearer";

const Req = async (req) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(BEARER)) {
    throw new Error("Your do not have active session. Please Login");
  }

  const token = authorization.split(" ").at(-1);

  const decodedId = decrypt(token);

  const findUser = await getUserById(decodedId.id);

  if (!findUser) {
    throw new Error("UnAuthorised Access. Please login again");
  }

  return findUser;
};

export default Req;
