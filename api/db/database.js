import mongoose from "mongoose";

// const DBConnect=async ()=>{

// const db=await mongoose.connect(`${process.env.URL_MONGO_DB}/reseau-social`);
// return db;
// }


const DBConnect=async ()=>{
   mongoose.connect(process.env.URL_MONG0_DB_ATLAS)
   .then(() => console.log("✅ Connecté à MongoDB Atlas"))
   .catch((err) => console.error("❌ Erreur de connexion :", err));
   ;
}

export default DBConnect;