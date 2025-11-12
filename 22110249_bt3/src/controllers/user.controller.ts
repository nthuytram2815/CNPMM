import { Request, Response } from "express";
import User from "../models/user.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    await User.create(req.body);
    res.redirect("/users");
  } catch (err) {
    res.status(500).send("Lỗi khi thêm người dùng");
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.render("users/findAllUser", { users });
};

export const showCreatePage = (req: Request, res: Response) => {
  res.render("crud");
};

export const showUpdatePage = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.render("users/updateUser", { user });
};

export const updateUser = async (req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/users");
};

export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/users");
};