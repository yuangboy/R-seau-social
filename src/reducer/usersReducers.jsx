
import { GET_USERS } from "../actions/users.action";
const initialize={};

export const usersReducers=(state=initialize,action)=>{

    switch (action.type) {
        case GET_USERS:
             return action.payload;

        default:
            return state;
        
    }

}