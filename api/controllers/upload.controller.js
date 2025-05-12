
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";

import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";

// Simuler __dirname en mode ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadUpdate = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Aucun fichier envoyé" });
      }
  
      if (
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/jpg" &&
        req.file.mimetype !== "image/jpeg"
      ) {
        return res
          .status(400)
          .json({ message: "Format d'image non pris en charge" });
      }
  
      if (req.file.size > 500000) {
        return res
          .status(400)
          .json({ message: "Taille de l'image non prise en charge" });
      }
  
      const filename = `${req.body.name}${Date.now()}.jpg`;
      const uploadDir = path.join(__dirname, "../../client/public/upload/profil");
  
      // Assure-toi que le dossier existe
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      const filePath = path.join(uploadDir, filename);
      const myBuffer = Readable.from(req.file.buffer);
  
      await pipeline(myBuffer, fs.createWriteStream(filePath));

      const user=await UserModel.findByIdAndUpdate(
        req.body.userId,
        {
            $set:{picture: "./upload/profil/"+filename}
        },{
            new:true, upsert:true,setDefaultsOnInsert:true
        } 
      );

      if(!user) return res.status(400).json({message:"Données non transmise"})

    

  
      res.status(200).json({ message: "Fichier uploadé avec succès", user,filename });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'upload" });
    }
  };