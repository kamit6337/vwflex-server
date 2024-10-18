import mongoose from "mongoose";
import validation from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validation.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  photo: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.index({ email: 1 });

userSchema.methods.checkPassword = function (given_password) {
  //   WORK: CHECK IF USER PASSWORD DOES NOT MATCH WITH HASH PASSWORD
  const checkPassword = bcrypt.compareSync(
    String(given_password),
    this.password
  );

  return checkPassword;
};

userSchema.pre("save", function (next) {
  // Check if there's a password to hash
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
