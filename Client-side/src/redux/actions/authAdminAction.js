import { CREATE_ADMIN, GET_ALL_ADMIN, DELETE_ADMIN, CREATE_USER, GET_ALL_USER, DELETE_USER } from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localhostAuth = process.env.REACT_APP_authenticationService;

export const getAllAdmin = () => async (dispatch) => {
    try {
        const response = await axios.get(localhostAuth + 'getAdminList');
        dispatch({
            type: GET_ALL_ADMIN,
            payload: response.data
        })
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
        console.log("error getAllOrganization", error);
    }
}
export const createAdmin = (data) => async (dispatch) => {
    try {
        const response = await axios.post(localhostAuth + 'createAdmin', data);
        console.log("Create Admin Response:", response);
        if (response) {
            toast.success('Admin Created Successfully', { autoClose: 1500 });
        }
        dispatch({
            type: CREATE_ADMIN,
            payload: response
        });
    }
    catch (err) {
        console.log(err);
        toast.danger(err);
    }
}

export const deleteAdmin = (adminId) => async (dispatch) => {
    try {
        console.log("adminId from deleteAdmin", adminId);
        const response = axios.delete(localhostAuth + `deleteAdmin/${adminId}`);
        console.log("response is from delete admin action", response);
        dispatch({
            type: DELETE_ADMIN,
            payload: response
        })
    }
    catch (error) {
        console.log('err', error);
    }
}

export const createUser = (data) => async (dispatch) => {
    try {
        console.log("data from cretaeUser authAdminAction", data)
        const response = await axios.post(localhostAuth + 'createUser', data);
        console.log("Create User Response:", response);
        if (response) {
            toast.success('User Created Successfully', { autoClose: 1500 });
        }
        dispatch({
            type: CREATE_USER,
            payload: response
        });
    }
    catch (err) {
        console.log(err);
        toast.danger(err);
    }
}

export const getAllUser = () => async (dispatch) => {
    try {
        const response = await axios.get(localhostAuth + 'getUserList');
        console.log("Response get all user authAdminAction ", response.data);
        dispatch({
            type: GET_ALL_USER,
            payload: response.data.userList
        })
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
        console.log("error getAllOrganization", error);
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    try {
        console.log("user Id from deleteAdmin", userId);
        const response = axios.delete(localhostAuth + `deleteUsers/${userId}`);
        console.log("response is from delete user action", response);
        dispatch({
            type: DELETE_USER,
            payload: response
        })
    }
    catch (error) {
        console.log('err', error);
    }
}