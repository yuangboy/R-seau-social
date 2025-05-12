import {BrowserRouter,Route,Routes} from "react-router-dom";
import Profil from "../pages/Profil";
import Home from "../pages/Home";
import Navbar from "../components/navbar";


export default function MaRoute(){
    return (
        <BrowserRouter>
        <Navbar/>
         <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/profil" element={<Profil/>}></Route>
         <Route path="/*" element={<Home/>}></Route>
         
         </Routes>
         
        </BrowserRouter>
    )
}