import {
    LOGIN, SIGN_UP
} from './actionTypes';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const signUp = (data) => (dispatch) => {
    try {
        const response = axios.post('http://localhost:3002/userRegister', data);
        console.log("Sign Up response:", response);
        if (response) {
            toast.success('Signed in Successfully', { autoClose: 1500 });
        }
        dispatch({
            type: SIGN_UP,
            payload: response
        });
    }
    catch (err) {
        console.log(err);
        toast.danger(err);
    }
}

export const login = (data) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3002/userLogin', data);
        localStorage.setItem("user", JSON.stringify(response));
        const role = response.data.user.role;
        if (response) {
            toast.success('Logged in Successfully', { autoClose: 1500 });
        } else {
            toast.error('Something Went Wrong', { autoClose: 1500 });
        }
        dispatch({
            type: LOGIN,
            payload: response
        });
        return role;
    }
    catch (error) {
        toast.error(error?.response?.data?.message)
        return false
    }
}

