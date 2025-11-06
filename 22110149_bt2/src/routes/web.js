import express from "express";
import * as homeController from "../controllers/homeController.js";

const router = express.Router();

router.get("/", homeController.getHomePage);
router.post("/create-user", homeController.postCreateUser);
router.get("/users", homeController.getAllUsers);
router.get("/update/:id", homeController.getUpdatePage);
router.post("/update/:id", homeController.postUpdateUser);
router.get("/delete/:id", homeController.getDeleteUser);

export default router;
