/**
 * imported all the action name from the actionTypes.js 
 */
import {
    ADD_TODO, DELETE_TODO, CLEAR_ALL_TODO, EDIT_TODO, UPDATE_TODO, MARK_COMPLETED, GET_TODOS, DELETE_USER_TODO
} from "./actionTypes";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localhostAuth = process.env.REACT_APP_authenticationService;

const localhostUserAction = process.env.REACT_APP_userServices;

// const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))['data']['user']['_id'] : null
/**
 * Defined all the function needed for performing the perticular action 
 */

/**
 * @param {todo List} todo 
 * @returns Add the new todo list in the existing one
 */

/**
 * Get All todo
 */
export const getTodos = () => async (dispatch) => {
    console.log("getTodo func call;")
    const response = await axios.get(localhostUserAction + '/getAllTaskByUserId');
    dispatch({
        type: GET_TODOS,
        payload: response.data
    })
}

export const addNewTodo = (todo) => (dispatch) => {
    try {
        console.log("todo is addnNewTodo", todo);
        const response = axios.post(`${localhostUserAction}/createTask`, todo);
        if (response) {
            toast.success('Added Successfully', { autoClose: 1500 });
        }
        else {
            toast.error('Something Went Wrong', { autoClose: 1500 });
        }
        dispatch({
            type: ADD_TODO,
            payload: response.data
        });
        // toast.success('Added Successfully')
    }
    catch (error) {
        console.log('error is', error);
        // toast.error('somthing went wrong, sry about that');
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

/**
 * @param {id} id 
 * @returns Delete the perticular Todo and return
 */
export const deleteTodo = (id) => (dispatch) => {
    //     console.log("delete todo id", id);
    //     const userId = JSON.parse(localStorage.getItem("user"))["data"]["user"]["_id"];
    //     console.log(userId);
    //     try {
    //         const response = axios.post(`http://localhost:3002/deleteTodo/${id}`, { id: userId });
    //         console.log(response);
    //         console.log(response.resolve());
    //         const er = response.resolve().catch()
    //         console.log(er);
    //         if (response) {
    //             toast.warning('Deleted Successfully', { autoClose: 1500 })
    //         }
    //         // else{toast.warning('deleted warning', {autoClose:2000})}   
    //         // window.location.reload();
    //         dispatch({
    //             type: DELETE_TODO,
    //             payload: response.data
    //         });
    //         // toast.success("MY SUCCESS");
    //     }
    //     catch (err) {
    //         toast.error('Something Went Wrong', err);
    //     }
}

/**
 * 
 * @returns It will clear all the todo list
 */
export const clearAlltodo = () => (dispatch) => {
    // const response = axios.delete('http://localhost:3002/deleteAllTodo');
    // if (response) {
    //     toast.success('All Todos Deleted Successfully', { autoClose: 1500 })
    // }
    // else {
    //     toast.error('Something Went Wrong', { autoClose: 1500 });
    // }
    // dispatch({
    //     type: CLEAR_ALL_TODO,
    //     payload: response
    // });

}

/**
 * 
 * @param {id} id 
 * @returns To edit the perticular todo based on the id
 */
export const editTodo = (id) => (dispatch) => {
    dispatch({
        type: EDIT_TODO,
        payload: id,
        isEdit: true
    })
}

/**
 * 
 * @param {id} id 
 * @param {todo list} todo 
 * @returns update the todo list
 */

export const updateTodo = (id, todo) => (dispatch) => {
    console.log("Update todo from index.js");
    console.log("Todo id:", id);
    const response = axios.put(`${localhostUserAction}/updatetask/${id}`, todo);
    console.log("Response is :", response);
    if (response) {
        toast.success('Updated Successfully', { autoClose: 1500 })
    }
    else {
        toast.error('Something Went Wrong', { autoClose: 1500 });
    }

    dispatch({
        type: UPDATE_TODO,
        payload: response.data
    });
    // window.location.reload();
}

/**
 * 
 * @param {id} id 
 * @returns mark the existing todo as completed and return the todo
 */
export const markTodoCompleted = (id) => (dispatch) => {
    const response = axios.put(`http://localhost:3002/updateStatus/${id}`);
    if (response) {
        toast.success('Marked Completed Successfully', { autoClose: 1500 })
    }
    else {
        toast.error('Something Went Wrong', { autoClose: 1500 });
    }
    dispatch({
        type: MARK_COMPLETED,
        payload: response
    });
}

export const deleteUserTodo = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${localhostUserAction}/deleteTask/${id}`);
        dispatch({
            type: DELETE_USER_TODO,
            payload: response
        })
    }
    catch (error) {
        console.log(error);
    }
}