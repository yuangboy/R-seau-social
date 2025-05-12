import PostModel from "./../models/post.model.js";
import UserModel from "../models/user.model.js";

import { errorValidator } from "../errors/error.js";
import mongoose, { now } from "mongoose";
import {fileURLToPath} from "url";
import path from "path";
import {Readable} from "stream";
import { pipeline } from "stream/promises";
import fs from "fs";
const ObjectID = mongoose.Types.ObjectId;


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

export const readPost = async (req, res) => {
    try {
        const post = await PostModel.find();
        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
    }

}

export const createdPost = async (req, res) => {

    try {

        const {
            posterId,
            message,
            comments,
            picture,
            video,
            likers
        } = req.body;

        const filename=`${posterId}`+Date.now()+`.jpg`;
        const dossierContent=path.join(__dirname,`../../client/public/upload/post`);

        if(!fs.existsSync(dossierContent)){
               fs.mkdirSync(dossierContent);
        }

        const filePath=path.join(dossierContent,filename);

        const myBuffer=Readable.from(req.file.buffer);

       await pipeline(
             myBuffer,
            fs.createWriteStream(filePath)
       );

        const post = new PostModel(
            { posterId,
              message, 
              picture:req.file ? `./upload/post/${filename}`: "",              
              comments: [], 
              likers: [],
            });



        await post.save();

        if (post) {
            res.status(201).json({ message: "Donnée insérée avec succèes !!" });
        }

    } catch (error) {

        errorValidator(error, res);

    }

}

export const updatedRecord = async (req, res) => {

    const { id } = req.params;
    const { message } = req.body;

    if (!ObjectID.isValid(id)) return res.status(400).json({ message: "Id not Found" });

    try {
        const update = await PostModel.findByIdAndUpdate(
            id,
            { $set: { message } },
            { new: true }
        );
        if (update) {
            res.status(200).json({ user: update });
        }


    } catch (error) {
        errorValidator(error, res);
    }

}

export const deletePost = async (req, res) => {

    const { id } = req.params;
    try {

        if (!ObjectID.isValid(id)) return res.status(400).json({ message: "ID not found" });

        const post = await PostModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Delete Post", post });


    } catch (error) {

    }

}

export const linkPost = async (req, res) => {
    const { id } = req.params;

    try {

        if (!ObjectID.isValid(id) || !ObjectID.isValid(req.body.id)) return res.status(400).json({ message: "Id not Found" });

        const post = await PostModel.findByIdAndUpdate(
            id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true }
        );

        const user = await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: id }
            },
            { new: true }
        );


        res.status(200).json({ user, post });


    } catch (error) {
        console.log(error);
    }

}

export const unLinkPost = async (req, res) => {

    const { id } = req.params;

    try {

        if (!ObjectID.isValid(id) || !ObjectID.isValid(req.body.id)) return res.status(400).json({ message: "Id not Found" });

        const post = await PostModel.findByIdAndUpdate(
            id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true }
        );

        const user = await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: id }
            },
            { new: true }
        );


        res.status(200).json({ user, post });


    } catch (error) {
        console.log(error);
    }

}

export const commentPost = async (req, res) => {

    const { id } = req.params;
    const { commentId, pseudo, text } = req.body;


    if (!ObjectID.isValid(id) || !ObjectID.isValid(commentId)) return res.status(400).json({ message: "Id not Found" });

    try {

        const post = await PostModel.findByIdAndUpdate(
            id,
            {
                $push: {
                    comments: {
                        commenterId: commentId,
                        commenterPseudo: pseudo,
                        text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true, unsert: true }
        );

        res.status(200).json({ comments: post });


    } catch (error) {
        console.log(error);
    }




}

export const EditcommentPost = async (req, res) => {

    const { id } = req.params;
    const { commentId } = req.body;

    if (!ObjectID.isValid(id) || !ObjectID.isValid(commentId)) return res.status(400).json({ message: "Id not Found" });

    try {
        const post = await PostModel.findById(id);

        if (!post) return res.status(500).json({ message: "Id not Found" });

        const comment = post.comments.find(c => c.commenterId === commentId);

        if (!comment) return res.status(500).json({ message: "Not Found Comment" });

        comment.text = req.body.text;
        await post.save();
        res.status(200).json({ comment });
        console.log("lire: ", comment);





    } catch (error) {
        console.log(error);
    }

}


export const deleteCommentPost = async (req, res) => {

    const { id } = req.params;
    const { commentId } = req.body;

    if (!ObjectID.isValid(id) || !ObjectID.isValid(commentId)) return res.status(400).json({ message: "Id not Found" });


    try {

        const comment = await PostModel.findByIdAndUpdate(
            id,
            {
                $pull: {
                    comments: {
                        commenterId: commentId
                    }
                }
            }, {
            new: true
        }
        );

        if (!comment) return res.status(400).json({ message: "Id comment not Found" });

        res.status(200).json({ comment });



    } catch (error) {
        console.log(error);
    }

}

