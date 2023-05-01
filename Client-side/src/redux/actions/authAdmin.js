import { CREATE_ADMIN, GET_ALL_ADMIN } from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const localhostAuth = process.env.REACT_APP_authenticationService;

export const getAllAdmin = () => async (dispatch) => {
    try {
        const response = await axios.get(localhostAuth + 'getAdminList');
        // console.log("Response is ", response.data);
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
export const createAdmin = (data) => (dispatch) => {
    try {
        const response = axios.post(localhostAuth + 'userRegister', data);
        console.log("Sign Up response:", response);
        if (response) {
            toast.success('Signed in Successfully', { autoClose: 1500 });
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

