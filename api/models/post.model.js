import mongoose from "mongoose";

const PostSchema=mongoose.Schema(

{

    posterId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        maxLength:500,
        trim:true,
        required:[true,"Ce champ est requis"]
    },
    comments:{
        type:[
            {
                commenterId:String,
                commenterPseudo:String,
                text:String,
                timestamp:Number
            }
                
        ]
    },
    picture:{type:String},
    video:{type:String},
    likers:[String]

},

{
    timestamps:true
}
);

const PostModel=mongoose.model("post",PostSchema);
export default PostModel;