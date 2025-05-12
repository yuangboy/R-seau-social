import React,{useState} from 'react'
import {useDispatch,useSelector} from "react-redux";
import { getUser,uploadUser} from '../../actions/user.action';
import { userReducer } from '../../reducer/userReducer';
import { Input } from '../../../components/ui/input'




export const UploadImage = () => {

    const [file,setFile]=useState();
     const dispatch=useDispatch();
     const userData=useSelector(state => state.userReducer);

      const handleUploadImage=(e)=>{
        
            e.preventDefault();
              
            const data=new FormData();
            data.append("name",userData?.user?.pseudo);
            data.append("userId",userData?.user?._id);
            data.append("file",file);
            dispatch(uploadUser(data,userData?.user?._id))

           if(window !== "undefined"){
             window.location="/profil";
           } 
    
        }

  return (
   
         <form onSubmit={handleUploadImage}  className=''>
              
               <Input type='file' 
               accept='.jpg,.png,jpeg'
               name='file'
               id='file'
        
               className='mb-4'  onChange={(e)=>setFile(e.target.files[0])}/>
               <Input type='submit' />
            </form>

  
  )
}

