import React,{useState,useEffect} from 'react'
import { userReducer } from '../../reducer/userReducer';
import { followUser,unFollowUser } from '../../actions/user.action';
import {useSelector,useDispatch} from "react-redux";
import { IsEmpty } from '../../utils/IsEmpty';
import { Button } from '../../../components/ui/button';

export const FollowHandler = ({idOnFollow}) => {

    const dispatch=useDispatch();
    const userData=useSelector(state=> state.userReducer);
    const [isFollowed,setIsFollowed]=useState(false);


     const handleFollow=()=>{  
        dispatch(followUser(userData?.user?._id,idOnFollow));
        setIsFollowed(true);
        
    }

    const handleUnFollow=()=>{
         dispatch(unFollowUser(userData?.user?._id,idOnFollow));
        setIsFollowed(false);
    }


    useEffect(()=>{

        if(!IsEmpty(userData?.user?.following)){

            if(userData?.user?.following.includes(idOnFollow) && !IsEmpty(userData?.user?.following) ){
                setIsFollowed(true)
            }

        }


    },[userData,idOnFollow]);


  return (
    <>

    {
        isFollowed &&
        (
            <span onClick={handleUnFollow}>
                <Button>Abonné</Button>
            </span>
        )
    }


    {
        isFollowed===false && (
            <span onClick={handleFollow}>
                <Button>Suivre</Button>
            </span>
        )
    }
    
    </>
  )
}
