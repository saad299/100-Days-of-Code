const user = require("../models/user");

const getUsers = async (req, res) => {
  const users = await user.find().select("-password");

  res.json(users);
};

const getUsersById = async (req, res) => {
  const oneUser = await user.findById(req.params.id).select("-password");

  res.json(oneUser);
};

module.exports = { getUsers, getUsersById };