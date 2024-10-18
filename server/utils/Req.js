const BEARER = "Bearer";

const Req = (req) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith(BEARER)) {
    throw new Error("Your do not have active session. Please Login");
  }

  const token = authorization.split(" ").at(-1);

  return { token };
};

export default Req;
