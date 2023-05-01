import { CREATE_ADMIN, GET_ALL_ADMIN, ADD_TODO_ADMIN, GET_ALL_USERS, DELETE_USER, GET_ADMIN_TODO, DELETE_ADMIN_TODO } from "../actions/actionTypes";

const initialState = {
    data: [],
    adminTodoList: [],
    admin: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ADMIN:
            return {
                ...state,
                admin: action.payload
            }

        case CREATE_ADMIN:
            return {
                ...state,
                admin: [
                    ...state.admin
                ]
            }

        case ADD_TODO_ADMIN:
            return {
                ...state,
                data: [
                    ...state.data
                ]
            }

        case GET_ALL_USERS:
            return {
                ...state,
                data: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                // profile: action.payload
            }
        case GET_ADMIN_TODO:
            return {
                ...state,
                // data: action.payload
                adminTodoList: action.payload
            }
        case DELETE_ADMIN_TODO:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;