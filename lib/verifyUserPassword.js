import bcrypt from "bcryptjs";

const verifyUserPassword = (actualPassword, givenPassword) => {
  const checkPassword = bcrypt.compareSync(
    String(givenPassword),
    actualPassword
  );

  return checkPassword;
};

export default verifyUserPassword;
