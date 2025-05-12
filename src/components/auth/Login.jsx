import React,{useState,useEffect} from 'react'
import axios from "axios";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "../../../components/ui/tabs"
 
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"

  import { Button } from "../../../components/ui/button"

  import { Input } from "../../../components/ui/input"
  import { Label } from "../../../components/ui/label";

export const Login = () => {

  const [username,setUsername]=useState({
    email:"",
    password:""
  });
 

  const handleLogin=async ()=>{
        // e.preventDefault();
     try {

      const {email,password}=username;
      const response=await axios.post(`${import.meta.env.VITE_URL}/users/login`, {email,password});
      console.log(`email: ${email}\npassword: ${password}`);
      if(response.status===200){
        const {token}=response.data;
        console.log("response data",response.data);
        localStorage.setItem("authToken",token);
        if(window !== "undefined"){
            window.location="/";
        }
        
      }
      
     } catch (error) {
      console.log(error.response.data);

      let passwordDiv=document.querySelector(".password-error");
        let emailDiv=document.querySelector(".email-error");
        emailDiv.innerHTML="";
        passwordDiv.innerHTML="";
      
      if(error.response || error.response.data){
     

        const {email,password,message}=error.response.data;
        
      
       
        emailDiv.innerHTML=email || "";
        passwordDiv.innerHTML=password || message || "";
      }
       
      
     }

  }

  return (
    <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
            Se connecter a votre compte !
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
        
          <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" 
              value={username.email}
              onChange={(e)=>
              setUsername({
                ...username,
                email:e.target.value
              })
              }
               />
               <div className='email-error text-red-500'></div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwors">Password</Label>
              <Input id="password" type="password" placeholder='**************************'
               value={username.password}
               onChange={(e)=>
               setUsername({
                 ...username,
                 password:e.target.value
               })
               }
              />
               <div className='password-error text-red-500'></div>
            </div>

          </CardContent>
          <CardFooter>
            <Button 
            type='submit' className='w-full cursor-pointer'
            onClick={handleLogin}
            >Connection </Button>
          </CardFooter>
        </Card>
      </TabsContent>
  )
}
