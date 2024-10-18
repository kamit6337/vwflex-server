import getUserById from "../database/User/getUserById.js";
import { decrypt } from "../utils/encryption/encryptAndDecrypt.js";
import Req from "../utils/Req.js";

const err = new Error("Not Authorised");
err.status = 404;

const socketAuthMiddleware = async (socket, next) => {
  // const cookie = socket.handshake.headers.cookie;
  try {
    const { token } = Req(socket.handshake);

    const decoded = decrypt(token);

    const findUser = await getUserById(decoded.id);

    if (!findUser) {
      return next(err);
    }

    socket.user = findUser;
    socket.userId = findUser._id.toString();

    next();
  } catch (error) {
    return next(error);
  }
};

export default socketAuthMiddleware;
