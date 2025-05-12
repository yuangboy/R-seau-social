import {
    createdPost,
    readPost,
    updatedRecord,
    deletePost,
    linkPost,
    unLinkPost,
    commentPost,
    EditcommentPost,
    deleteCommentPost
} from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import express from "express";
import multer from "multer";

export const routerPost = express.Router();

const upload = multer({ storage: multer.memoryStorage() })

routerPost.post("/create", authenticate, upload.single("file"), createdPost);
routerPost.get("/", readPost);
routerPost.patch("/update/:id", updatedRecord);
routerPost.delete("/delete-post/:id", deletePost);
routerPost.patch("/like-post/:id", linkPost);
routerPost.patch("/unlike-post/:id", unLinkPost);
routerPost.patch("/comment-post/:id", commentPost);
routerPost.patch("/edit/comment-post/:id", EditcommentPost);
routerPost.patch("/delete/comment-post/:id", deleteCommentPost);



