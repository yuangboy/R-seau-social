import { GET_USER,
         UPLOAD_USER,
         UPDATE_BIO,
         FOLLOW_USER,
         UNFOLLOW_USER
        } from "../actions/user.action";

// const initialState = {};

const initialState = {
  _id: "",
  pseudo: "",
  email: "",
  picture: "",
  followers: [],
  following: [],
  likes: [],
  bio: ""
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_USER:
      return {
        ...state,
        picture:action.payload
      }
    case UPDATE_BIO:
      return {
        ...state,
        bio:action.payload
      }
    case FOLLOW_USER:
      return {
        ...state,
        following:action.payload.following
      }
      
       case UNFOLLOW_USER:
      return {
        ...state,
        following:state?.user?.following.filter((id)=> id !== action.payload.idOnFollow)
      } 
    
    default:
      return state;
  }
};
