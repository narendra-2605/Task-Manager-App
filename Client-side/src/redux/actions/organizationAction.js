import { GET_ALL_ORGANIZATION, CREATE_ORGANIZATION } from './actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const localhostAuth = process.env.REACT_APP_authenticationService;

export const getAllOrganization = () => async (dispatch) => {
    try {
        const response = await axios.get(localhostAuth + 'getOrganizationList');
        // console.log("Reasponse is :", response);
        dispatch({
            type: GET_ALL_ORGANIZATION,
            payload: response.data
        })
    }
    catch (error) {
        toast.error(error?.response?.data?.message, { autoClose: 1500 });
        console.log("error getAllOrganization", error);
    }
}

export const createOrganization = (data) => async (dispatch) => {
    try {
        const response = await axios.get(localhostAuth + 'createorganization');
        console.log("response is from org action", response);
        dispatch({
            type: CREATE_ORGANIZATION,
            payload: response.data
        })
    } catch (error) {
        console.log(error);
    }
}