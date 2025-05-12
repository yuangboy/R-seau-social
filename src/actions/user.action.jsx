import axios from "axios";


export const GET_USER="GET_USER";
export const UPLOAD_USER="UPLOAD_USER";
export const UPDATE_BIO="UPDATE_BIO";
export const FOLLOW_USER="FOLLOW_USER";
export const UNFOLLOW_USER="UNFOLLOW_USER";

export const getUser=(uid)=>{


    return (dispatch)=>{
          return  axios.get(`${import.meta.env.VITE_URL}/users/${uid}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("authToken")}`
            }
          }).then((response)=>{
            dispatch({type:GET_USER,payload:response.data})

          })
          .catch((error)=>{
            console.log(error);
          })
    }


}


export const uploadUser=(data,id)=>{


  return (dispatch)=>{
    return axios.post(`${import.meta.env.VITE_URL}/users/upload`,data,{
      Headers:{
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${localStorage.getItem("authToken")}`
      }
    })
    .then(response => {
      return axios.get(`${import.meta.env.VITE_UR}/users/${id}`)
      .then(response =>{
           dispatch({type:UPLOAD_USER,payload:response.data?.user?.picture})
      })

    })
    .catch(error => console.log(error)
    )

  }

}

export const updateBio=(id,data)=>{

  return (dispatch)=>{

       return axios.put(`${import.meta.env.VITE_URL}/users/update/bio/${id}`,data,
        {
           headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("authToken")}`
                  }
        }
      )
              .then(_ => {
                return axios.get(`${import.meta.env.VITE_URL}/users/${id}`,{
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("authToken")}`
                  }
                }).then(res=> {
                     dispatch({type:UPDATE_BIO,payload:res.data?.user?.bio});
                })

              }).catch(error => console.log(error)
            );
       
  }

}

export const followUser=(id,idOnFollow)=>{
  return (dispatch)=>{
      return axios.patch(`${import.meta.env.VITE_URL}/users/follow/${id}`,{idOnFollow},{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("authToken")}`
        }
      }).then((res)=> {
        dispatch({type:FOLLOW_USER,payload:{following:res.data.following?.following}})
      })
  }
}

export const unFollowUser=(id,idOnFollow)=>{

  return (dispatch)=>{

     return axios.patch(`${import.meta.env.VITE_URL}/users/unfollow/${id}`,{idOnFollow},{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${localStorage.getItem("authToken")}`
        }
      }).then((res)=> {
        dispatch({type:UNFOLLOW_USER,payload:{idOnFollow}})
      })

  }

}
