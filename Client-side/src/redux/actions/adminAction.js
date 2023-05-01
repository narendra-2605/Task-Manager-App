import {
    GET_ALL_USERS, DELETE_USER, ADD_TODO_ADMIN, GET_ADMIN_TODO, DELETE_ADMIN_TODO
} from './actionTypes';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const addTodo = (todo) => (dispatch) => {
    try {
        console.log("todo from adminTodo", todo);
        const response = axios.post("http://localhost:3002/postAdminTodo", todo);
        console.log("addnew todo res", response);
        if (response) {
            toast.success('Added Successfully', { autoClose: 1500 })
        }
        else {
            toast.error('Something Went Wrong', { autoClose: 1500 });
        }
        dispatch({
            type: ADD_TODO_ADMIN,
            payload: response.data
        });
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

export const getAllUser = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:3002/getUserList");
        dispatch({
            type: GET_ALL_USERS,
            payload: response.data
        })
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
        console.log("error getAlluser", error);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        console.log("User id is", id);
        const response = await axios.delete(`http://localhost:3002/deleteUser/${id}`);
        console.log("delete user response", response);
        toast.success(response?.data?.message, { autoClose: 1500 });
        dispatch({
            type: DELETE_USER
        })
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}

export const getAdminTodos = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:3002/getAllAdminTodo");
        // console.log("Response of getAdminTodos", response);
        toast.success(response?.data?.message, { autoClose: 1500 });
        dispatch({
            type: GET_ADMIN_TODO,
            payload: response.data
        })
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}


export const deleteAdminTodo = (id) => async (dispatch) => {
    try {
        // console.log("Admin Todo id is", id);
        const response = await axios.delete(`http://localhost:3002/deleteAdminTodo/${id}`);
        // console.log("delete user response", response);
        toast.success(response?.data?.message, { autoClose: 1500 })
        dispatch({
            type: DELETE_ADMIN_TODO
        })
    }
    catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
    }
}