import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
    const entete = req.headers.authorization;

    if (!entete || !entete.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Token manquant ou invalide" });
    }

    const token = entete.split(" ")[1];
   
    try {

        const access_key = process.env.JWT_SECRET;

        if (!access_key) return res.json({ message: "Jwt access key manquant " });

        const decoded = jwt.verify(token, access_key);

        const user = await UserModel.findOne({ _id: decoded._id, "authTokens.authToken": token });
        console.log("user auth", user);

        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        req.authToken = token;
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré", error: error.message });
    }
};
