import express from "express";
const router = express.Router();
import * as UserController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as FileController from "../app/controllers/FileController.js";

// Users
router.post("/Registration",UserController.Registration)
router.post("/Login",UserController.Login)
router.post("/UpdateUserProfile",AuthMiddleware,UserController.UpdateUserProfile)
router.get("/ReadUserProfile",AuthMiddleware,UserController.ReadUserProfile)

// File Upload
router.post("/UploadFile", FileController.UploadFile);
router.get("/FileRead/:fileName", FileController.FileRead);
router.delete("/DeleteSingleFile/:fileName",FileController.DeleteSingleFile);

export default router;