import mongoose from "mongoose";

const DBConnect=async ()=>{

const db=await mongoose.connect(`${process.env.URL_MONGO_DB}/reseau-social`);
return db;
}


export default DBConnect;