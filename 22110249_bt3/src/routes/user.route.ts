import { Router } from "express";
import {
  createUser,
  getAllUsers,
  showCreatePage,
  showUpdatePage,
  updateUser,
  deleteUser
} from "../controllers/user.controller";

const router = Router();

router.get("/", showCreatePage);
router.get("/users", getAllUsers);
router.post("/create-user", createUser);
router.get("/update/:id", showUpdatePage);
router.post("/update/:id", updateUser);
router.get("/delete/:id", deleteUser);

export default router;