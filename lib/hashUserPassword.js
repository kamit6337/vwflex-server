import bcrypt from "bcryptjs";

const hashUserPassword = (obj) => {
  if (obj.password) {
    obj.password = bcrypt.hashSync(obj.password, 12);
  }

  return obj;
};

export default hashUserPassword;
