import {combineReducers} from "redux";
import { userReducer } from "./userReducer";
import { usersReducers } from "./usersReducers";

export default combineReducers(
    {
        userReducer,
        usersReducers,
    }
);