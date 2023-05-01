import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";

/**
 * Combine todoReducer and store it in the rootReducer
 */

const rootReducer = combineReducers({
    todoReducer, authReducer, adminReducer
})
export default rootReducer