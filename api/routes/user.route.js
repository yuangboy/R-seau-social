import express from "express";
import multer from "multer";

import {
    createdUser,
    follow,
    unFollow,
    login,
    userMe,
    findAll,
    logout,
    logoutAll,
    userId,
    updateBioId
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import {uploadUpdate} from "../controllers/upload.controller.js";
 

const upload=multer({storage:multer.memoryStorage()})


export const router = express.Router();

router.post("/register", createdUser);
router.post("/upload",upload.single("file"),uploadUpdate);
router.put("/update/bio/:id",authenticate,updateBioId);
router.get("/all",authenticate, findAll);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.post("/logout-all",authenticate,logoutAll);
router.get("/me", authenticate, userMe);
router.get("/:id", authenticate, userId);
router.patch("/follow/:id",authenticate, follow);
router.patch("/unfollow/:id",authenticate, unFollow);

