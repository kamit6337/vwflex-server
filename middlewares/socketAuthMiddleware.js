import Req from "../utils/Req.js";

const err = new Error("Not Authorised");
err.status = 404;

const socketAuthMiddleware = async (socket, next) => {
  // const cookie = socket.handshake.headers.cookie;
  try {
    const findUser = await Req(socket.handshake);

    socket.user = findUser;
    socket.userId = findUser._id.toString();

    next();
  } catch (error) {
    return next(error);
  }
};

export default socketAuthMiddleware;
