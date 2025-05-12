import React,{useContext} from 'react'


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { UidContext } from '../provider/AppContext';
import UpdateProfil from '../components/profil/updateProfil';

export default function Profil() {
  const uid=useContext(UidContext);
  return (
 <>

 {
  uid ? (
    <UpdateProfil/>
  ):
  <div className='h-screen flex gap-20 px-10 justify-center py-10'>
        
  <div className='h-full col-span-1'>

  <Tabs defaultValue="account" className="w-[400px]">
<TabsList className="grid w-full grid-cols-2">
  <TabsTrigger value="account">Login</TabsTrigger>
  <TabsTrigger value="password">Register</TabsTrigger>
</TabsList>
<Login/>
<Register/>
</Tabs>

   
  </div>



  <div className=' relative h-full col-span-1'>
    {/* <img alt='monde' src='/images/monde.png' className=' w-[500px] h-[500px] object-center' /> */}
    <img alt='monde' src='/images/undraw_designer_efwz.svg' className=' w-[500px] h-[500px] object-center' />

  </div>



</div>
 }
 
 
 </>
  )
}
