const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "first name is required"],
    minlength: 5,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    select: false,
    minlength: 8,
    required: [true, "password should be of 8 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already taken"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.correctPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
