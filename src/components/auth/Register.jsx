import React, { useState } from 'react';
import {
  TabsContent
} from "../../../components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import axios from 'axios';

export const Register = () => {
 
  const [username, setUsername] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    terms: ""
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (e) => {
     e.preventDefault();
    const { name, email, password, password_confirm } = username;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      terms: ""
    };

    if (!termsAccepted) {
      newErrors.terms = "Veuillez valider les conditions";
    }

    if (password !== password_confirm) {
      newErrors.password_confirm = "Les mots de passe ne correspondent pas";
    }

    if (Object.values(newErrors).some(msg => msg !== "")) {
      setErrors(newErrors);
      return;
    }

    try {
     
      const response=await axios.post(`${import.meta.env.VITE_URL}/users/register`, {
        pseudo:name,
        email,
        password
      });
      
      if(response.status===201){
         
        console.log("response data: ",response.data);

      }

      setUsername({
        name:"",
        email:"",
        password:"",
        password_confirm:""
      });


      console.log("Inscription réussie");
    } catch (error) {
        
      if(error.response || error.response.data){

        console.log(error.response);
        const newErrors={
          name:"",
          email:"",
          password:"",
        };

          newErrors.name=error.response.data.pseudo;
          newErrors.email=error.response.data.email;
          newErrors.password=error.response.data.password;
        setErrors(newErrors);


      }else{
        console.log("Erreur serveur",error);
      }
    }
    setErrors({
      name:"",
      email:"",
      password:"",
      password_confirm:""
    });
  };

  return (
    <TabsContent value="password">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Créer un compte...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={username.name}
              onChange={(e) => setUsername({ ...username, name: e.target.value })}
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={username.email}
              onChange={(e) => setUsername({ ...username, email: e.target.value })}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={username.password}
              onChange={(e) => setUsername({ ...username, password: e.target.value })}
            />
            {errors.password && <div className="text-red-500">{errors.password}</div>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              value={username.password_confirm}
              onChange={(e) => setUsername({ ...username, password_confirm: e.target.value })}
            />
            {errors.password_confirm && <div className="text-red-500">{errors.password_confirm}</div>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              J'accepte les conditions générales
            </label>
          </div>
          {errors.terms && <div className="text-red-500">{errors.terms}</div>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleRegister} className="w-full">
            S'enregistrer
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};
