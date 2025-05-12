import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import DBConnect from "./db/database.js";
import {router as UserRouter} from "./routes/user.route.js";
import {routerPost} from "./routes/post.route.js";


import {fileURLToPath} from "url";
import path from "path";

const app=express();
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);


app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use(cors({
  origin: 'http://localhost:5173', // ou '*' en développement
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api/users/upload', express.static(path.join(__dirname, '../client/public/upload')));
app.use("/api/users",UserRouter);
app.use("/api/post",routerPost);
dotenv.config();




DBConnect();

const PORT=process.env.PORT || 3000;
app.listen(PORT, console.log(`Serveur lancé au port: ${PORT}`));




