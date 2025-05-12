
import { json } from "express";
import { errorValidator } from "../errors/error.js";
import mongoose from "mongoose";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";


import {promisify} from "util";
// import fs from "fs";
// import { pipeline as streamPipeline,Readable} from "stream"; 
// import multer from "multer";
// const pipeline = promisify(streamPipeline);
// const upload=multer({storage:multer.memoryStorage()})
const ObjectID = mongoose.Types.ObjectId;






export const createdUser = async (req, res) => {

    try {
        const {
            pseudo,
            email,
            password,
            // bio,
            // followers,
            // following
            likes } = req.body;

        const existingUser = await UserModel.findOne({ pseudo });
        if (existingUser) return res.status(400).json({ message: "User already" });

        const user = new UserModel({
            pseudo, email, password,bio:"",followers: [], following: [], likes: []
        },
        );
        // await user.save();
        await user.generateAuthToken();

        if (user) {
            res.status(201).json({
                message: "Donnée enregistrée",
                user
            });
        }



    } catch (error) {
        errorValidator(error, res)
    }


}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        // if (!user) {
        //     return res.status(404).json({ emailMessage: "Utilisateur n'existe pas" });
        // }



        if (!email || !password) {
            if (!email && !password) {
                return res.status(400).json({ message: "Veuillez remplir les informations" });
            }
            if (!email) {
                return res.status(400).json({ email: "Email manquant" });
            }
            if (!password) {
                return res.status(400).json({ password: "Mot de passe manquant" });
            }
        }


        const verif = await bcrypt.compare(password, user.password);

        if (verif) {
            const token = await user.generateAuthToken();

            return res.status(200).json({
                user: {
                    _id: user._id,
                    pseudo: user.pseudo,
                    email: user.email,
                },
                token
            });
        } else {
            return res.status(401).json({ message: "Informations invalides" });
        }

    } catch (error) {

        errorValidator(error, res);
        // console.error("Erreur login :", error);
        // res.status(500).json({ message: "Erreur serveur" });
    }
};

export const logout = async (req, res) => {

    try {

       
        req.user.authTokens = req.user.authTokens.filter((authToken) => {
            return authToken.authToken !== req.authToken;
        });
       
        await req.user.save();
        res.status(200).json({ message: "Token supprimé"});


    } catch (error) {
        console.log(error);

    }
}

export const logoutAll=async (req,res)=>{
    try {
        req.user.authTokens=[];
        await req.user.save();
        res.status(200).json({ message: "Token supprimé"});
        
    } catch (error) {
        console.log(error);
    }
}

export const userMe = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (error) {
        console.log(error);
    }
}

export const updateBioId=async (req,res)=>{

    if(!ObjectID.isValid(req.params.id)) return res.status(400).json({message:"Id not found"});

    try {

        const user=await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:{bio:req.body.bio}
            },
            {new:true,upsert:true,setDefaultsOnInsert:true}

        );

        res.status(200).json({user});
        
    } catch (error) {
         console.log(error);
         
    }

}

export const userId=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await UserModel.findOne({_id:id})

       if(!user) return res.status(400).json({message:"Id not found"});

       res.status(200).json({user});
        
    } catch (error) {
          console.log(error);
          
    }
}

export const findAll = async (req, res) => {
    try {

        const users =await UserModel.find({}).sort({ createdAt: -1 });
        if (!users) return res.status(200).json({ message: "Aucun utilisateur trouvé" });

        res.status(200).json({ users });

    } catch (error) {
        console.log(error);

    }
}


export const follow = async (req, res) => {

    const { id } = req.params;
    const { idOnFollow } = req.body;

    try {

        if (!ObjectID.isValid(id) || !ObjectID.isValid(idOnFollow)) return res.status(400).json({ message: "Id not Found" });


        const user = await UserModel.findByIdAndUpdate(
            id,
            {
                $addToSet: { following: idOnFollow }
            },
            {
                new: true, upsert: true
            }
        );

        const user2 = await UserModel.findByIdAndUpdate(
            idOnFollow,
            {
                $addToSet: { followers: id }
            },
            {
                new: true, upsert: true
            }
        );

        res.status(200).json({ followers: user2, following: user });


    } catch (error) {

    }

}

export const unFollow = async (req, res) => {

    const { id } = req.params;
    const { idOnFollow } = req.body;

    try {

        if (!ObjectID.isValid(id) || !ObjectID.isValid(idOnFollow)) return res.status(400).json({ message: "Id not Found" });


        const user = await UserModel.findByIdAndUpdate(
            id,
            {
                $pull: { following: idOnFollow }
            },
            {
                new: true, upsert: true
            }
        );

        const user2 = await UserModel.findByIdAndUpdate(
            idOnFollow,
            {
                $pull: { followers: id }
            },
            {
                new: true, upsert: true
            }
        );

        res.status(200).json({ followers: user2, following: user });


    } catch (error) {

    }

}


