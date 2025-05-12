import { useEffect, useState } from 'react'
import {Button} from "./../components/ui/button";
import MaRoute from "./routes";
import { UidContext } from './provider/AppContext';
import {useDispatch,useSelector} from "react-redux";
// import { userReducer } from './reducer/userReducer';
import {getUser as getActionUser} from "./actions/user.action";
import axios from 'axios';

function App() {

  const [uid,setUid]=useState(null);
  const dispatch=useDispatch();


  useEffect(()=>{


    const getUser=async()=>{
      // console.log("get token: ",typeof localStorage.getItem("authToken"))
      await axios.get(`${import.meta.env.VITE_URL}/users/me`,{
        headers:{
          "Content-Type":"application-json",
          "Authorization":`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      )
      .then((response)=>{

        const {user}=response.data;
        console.log(response.data);      
        console.log("get user token", localStorage.getItem("authToken"));
        setUid(user._id);
      });
    }

    getUser();


    if(uid){
      dispatch(getActionUser(uid));
    }

    

  },[uid]);
  
   


  return (
    <UidContext value={uid}>
    < MaRoute/>
    </UidContext>
  )
}

export default App
