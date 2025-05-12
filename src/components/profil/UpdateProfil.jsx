import React, {useState,useContext} from 'react'
import { NavLinker} from '../navbar/NavLink'

import {useDispatch,useSelector} from "react-redux";

import { UidContext } from '../../provider/AppContext';
import { userReducer } from '../../reducer/userReducer';
import { usersReducers } from '../../reducer/usersReducers';
import {UploadImage} from './UploadImage';
import {updateBio as updateBiographie} from '../../actions/user.action';
import { Button } from '../../../components/ui/button';
import {Textarea} from "../../../components/ui/textarea";
import { FormatDate } from '../../utils/FormatDate';
import { ModalFollowing } from './modal/ModalFollowing';
import {ModalFollowers } from './modal/ModalFollowers';



const UpdateProfil = () => {
    
    const [updateBio,setUpdateBio]=useState(true);
    const uid=useContext(UidContext);
    const dispacth=useDispatch();
    const userData=useSelector(state => state.userReducer);
    const usersData=useSelector(state => state.usersReducers);
    const [description,setDescription]=useState(userData?.user?.bio || "");

    const [followersPopup,setFollowersPopup]=useState(false);
    const [followingPopup,setFollowingPopup]=useState(false);


const otherUsers = usersData?.filter(user => user?.pseudo !== userData?.user?.pseudo);
// console.log("Users différents de l'utilisateur connecté :", otherUsers);
    
  


    const handleSubmitBio=(e)=>{
        e.preventDefault();
        const data=new FormData();
        data.append("bio",description);
        dispacth(updateBiographie(userData?.user?._id,data)); 
        if(typeof window !=="undefined") window.location="/profil";
        setUpdateBio(!updateBio);

    }


  return (

  <>
    <div className='relative grid grid-cols-12 h-[80vh] space-x-4'>
        <div className='col-span-1'>
            <NavLinker/>
        </div>

        <div className='col-span-5 flex flex-col gap-4 justify-center items-center'>

            <h1 className='text-center'>Photo de Profil</h1>

            
         <img src={`${import.meta.env.VITE_URL}/users/upload/profil/${userData?.user?.picture.split("/").pop()}`} alt="" className='w-50 h-50 rounded-full object-cover' />
       
        {/* upload image */}
         <UploadImage/>

        </div>


        <div className='col-span-6 flex flex-col gap-4 justify-center px-10 items-center'>
         
         <h1 className='text-4xl font-bold'>Bio</h1>

         {
            updateBio ? (
                <>
                <div className='flex flex-col gap-4 items-end'>
                    <div className='border-1 p-4 rounded-md border-black'>
                    <p className='text-md font-light italic'>{userData?.user?.bio ? userData?.user?.bio : "Aucune description de l'auteur"}</p>
                </div>
                <Button onClick={()=>setUpdateBio(!updateBio)} className='inline-block'>Editer</Button>
                </div>
                <h3>Membre depuis le: {FormatDate(userData?.user?.updatedAt)} </h3>
                </>
            ): (
              <>
               <div className="grid w-full gap-2">
             <Textarea 

              defaultValue={userData?.user?.bio}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              
             />
             <Button onClick={handleSubmitBio}>Sauvegarder</Button>
           </div>
              </>
            )
         }

         <div className='bg-black px-8 py-2 rounded-2xl '>
          <span className='text-white text-center cursor-pointer'
           onClick={()=>setFollowersPopup(!followersPopup)}
          >
            abonné {userData?.user?.followers ? userData?.user?.followers.length : 0}
            </span>
         </div>
         <div className='bg-black px-8 py-2 rounded-2xl '
        
         >
          <span className='text-white text-center cursor-pointer'
           onClick={()=>setFollowingPopup(!followingPopup)}
           >
            abonnement {userData?.user?.following ? userData?.user?.following.length : 0}
          </span>
         </div>


           
        </div>
        
    
    
    {
      followingPopup && (<ModalFollowing />)
    }
    {
      followersPopup && (<ModalFollowers />)
    }

    </div>

    
  </>
  )
}

export default UpdateProfil