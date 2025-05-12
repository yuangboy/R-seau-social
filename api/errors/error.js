export const errorValidator=(error,res)=>{

 if(error.name=="ValidationError"){
        const errorValide={};


        Object.keys(error.errors).forEach((field) => {
         errorValide[field] = error.errors[field].message;
 });
 console.log("erreur validator: ",errorValide);
 res.status(400).json(errorValide);
 }

 console.log("error: ",error);

}