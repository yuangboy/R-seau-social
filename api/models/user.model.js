import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const { isEmail } = validator;


const UserSchema = mongoose.Schema({

    pseudo: {
        type: String,
        required: [true, "Ce champ est requis"],
        minLength: [3, "Ce champ doit contenir au minimum (03) caractères"],
        maxLength: [16, "Ce champ doit contenir au maximum (16) carcatères"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        validate: [isEmail, "Veuillez entrer une adresse email valide"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        minLength: [6, "Ce champ doit contenir au minimum (06) caractères"],
        required: [true, "Ce champ est requis"],
    },
    picture: {
        type: String,
        default: "./upload/profil/person.png"
    },
    bio: {
        type: String,
        maxLength: 1024
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    },
    authTokens: [
        {
            authToken: {
                type: String,
                required: true
            }
        }
    ]

},
    {
        timestamps: true
    }
);

UserSchema.methods.generateAuthToken = async function () {

    const access_key = process.env.JWT_SECRET;
    if (!access_key) throw new Error("La clé secrète JWT est manquante.");

    const authToken = jwt.sign({ _id: this._id.toString() }, access_key);
    this.authTokens.push({ authToken });
    await this.save();
    return authToken;

};

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});






const UserModel = mongoose.model("user", UserSchema);
export default UserModel;