// const user = require("../models/user");
import { Response } from "express";
import user from "../models/user";
import { AuthRequest } from "../middleware/auth.middleware";

export const getUsers = async (req: AuthRequest, res: Response) => {
  const users = await user.find().select("-password");

  res.json(users);
};

export const getUsersById = async (req: AuthRequest, res: Response) => {
  const oneUser = await user.findById(req.params.id).select("-password");

  res.json(oneUser);
};