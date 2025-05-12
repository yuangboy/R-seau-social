import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {useSelector} from "react-redux";
import { userReducer } from "../../../reducer/userReducer";
import { usersReducers } from "../../../reducer/usersReducers";
import { FollowHandler } from "../FollowHandler";

export function ModalFollowers() {

  const [isOpen,setIsOpen]=useState(true);

  const userData=useSelector(state=>state.userReducer)
  const usersData=useSelector(state=>state.usersReducers)



  const followersUsers=usersData.filter(user=> userData?.user?.followers.includes(user._id));
  

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      
      <DialogContent className="sm:max-w-[425px]" >
        <DialogHeader>
          <DialogTitle>Abonné(e)s</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
         
           {
           followersUsers.map((user)=>(
            <div key={user?._id} className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                         <img src={`${import.meta.env.VITE_URL}/users/upload/profil/${user?.picture.split("/").pop()}`}
                     className="w-12 h-12 rounded-full "
                     alt={user?.pseudo} />
                     <h3>{user?.pseudo}</h3>

                    </div>
                     <FollowHandler idOnFollow={user?._id}/>
                    </div>
           ))
                               
             
           }
          

        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
