import axios from "axios";

export const GET_USERS="GET_USERS";



export const getUsers=()=>{

    return (dispatch)=>{
         return axios.get(`${import.meta.env.VITE_URL}/users/all`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("authToken")}`
            }
         }).then(res => {
            dispatch({type:GET_USERS,payload:res.data?.users})
         })
    }
}