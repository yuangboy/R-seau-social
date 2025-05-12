import React from 'react'
import { NavLink } from 'react-router-dom'
import {House,Rocket,UserRound} from "lucide-react";

export const NavLinker = () => {
  return (
    <div className='mt-4  inline-block'>
      <ul className='flex flex-col gap-4 ml-4'>
        <li className=' '>
          <NavLink 
            to="/" 
            aria-current="page"
            className={({ isActive, isPending }) => 
              isPending ? "pending" : isActive ? "text-red-500" : ""
            }
          >
            <House width="50" height="50"/>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tradding" 
            aria-current="page"
            className={({ isActive, isPending }) => 
              isPending ? "pending" : isActive ? "text-red-400" : ""
            }
          >
           <Rocket width="50" height="50"/>
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/profil" 
            aria-current="page"
            className={({ isActive, isPending }) => 
              isPending ? "pending" : isActive ? "text-red-400" : ""
            }
          >
           <UserRound width="50" height="50"/>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
