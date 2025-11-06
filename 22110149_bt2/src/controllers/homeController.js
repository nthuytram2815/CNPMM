import * as CRUDService from "../services/CRUDService.js";

export const getHomePage = (req, res) => {
  res.render("crud");
};

export const postCreateUser = async (req, res) => {
  await CRUDService.createUser(req.body);
  res.redirect("/users");
};

export const getAllUsers = async (req, res) => {
  const users = await CRUDService.getAllUsers();
  res.render("users/findAllUser", { users });
};

export const getUpdatePage = async (req, res) => {
  const user = await CRUDService.getUserById(req.params.id);
  res.render("users/updateUser", { user });
};

export const postUpdateUser = async (req, res) => {
  await CRUDService.updateUser(req.params.id, req.body);
  res.redirect("/users");
};

export const getDeleteUser = async (req, res) => {
  await CRUDService.deleteUser(req.params.id);
  res.redirect("/users");
};
