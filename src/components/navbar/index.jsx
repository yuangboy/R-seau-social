import React from 'react'
import {useSelector} from "react-redux";
import { getUser } from '../../actions/user.action';
import { userReducer } from '../../reducer/userReducer';
import { useContext } from 'react';
import { UidContext } from '../../provider/AppContext';


export default function Navbar() {
   
    const uid=useContext(UidContext);

    const userData=useSelector((state)=>state.userReducer);
    

  return (
    <div className='min-w-screen flex items-center justify-between py-4 px-10 shadow-border border-b-2'>
    <div>
     <img src="/images/monLogo.png" alt="" className='w-12 h-12'/>
    </div>
    <div>
        {
            uid ? (
                <div className='flex gap-x-10 items-center'>
                    {userData?.user?.email}
                    <img src="/images/logout.png" alt="" className='h-12 w-12'/>
                    
            </div>
            ):
            (
                <div>Connection</div>
            )
        }
    
      
    </div>

    </div>
  )
}

