const User = require("../model/user_model.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});
const getuser = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.findOne().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res,next) => {
  // User registration
  
    try {
      const { username, email, password, role, leetCodeURL } = req.body;
      
      // Validate input (add more validation as needed)
      if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Check if the username or email is already in use
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email is already taken.' });
      }
  
      const user = new User({ username, email, password, role, leetCodeURL });
      await user.save();
  
      // Send a response with user information
      res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      next(err);
    }

});


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, role, password, leetCodeURL } = req.body;

  // Confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(role) ||
    !role.length ||
    !leetCodeURL.length
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.role = role;
  user.leetCodeURL = leetCodeURL;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user still have assigned notes?

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {

  getuser,
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
