const User = require("../models/user");
const generateToken = require("../utils/createToken");

// register user
module.exports.signup = async (req, res, next) => {
  try {
    console.log(req.body, "signup");
    const { email, firstname, lastname, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exist!.");
    }
    const user = await User.create({
      firstname,
      email,
      password,
      lastname,
    });

    if (user) {
      res.status(201).json({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        id: user._id,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // res.status(404).json({ error: error.message });
    next(error);
  }
};

// login user
module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body, "login");
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.correctPassword(password))) {
      res.json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Invalid Email or password!");
    }
  } catch (error) {
    next(error);
  }
};

// update user
module.exports.updateUserProfile = async (req, res, next) => {
  try {
    console.log(req.body, "update");
    const user = await User.findById(req.id);
    console.log(req.url, req.id);

    if (user) {
      user.firstname = req.body.firstname || user.firstname;
      user.email = req.body.email || user.email;
      user.lastname = req.body.lastname || user.lastname;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        password: updatedUser.password,
        id: updatedUser._id,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};

// /api/user?search=piyush
module.exports.allUsers = async (req, res, next) => {
  // const keyword = req.query.search
  //   ? {
  //       $or: [
  //         { firstname: { $regex: req.query.search, $options: "i" } },
  //         { email: { $regex: req.query.search, $options: "i" } },
  //       ],
  //     }
  //   : {};

  // const users = await await User.find(keyword);
  // res.send(users);
  const keyword = req.query.search;
  const user = await User.findOne({ firstname: keyword });
  res.send(user);
};
