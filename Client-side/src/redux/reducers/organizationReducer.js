import { GET_ALL_ORGANIZATION, CREATE_ORGANIZATION } from "../actions/actionTypes";

const initialState = {
    organization: []
}

const organizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORGANIZATION:
            return {
                ...state,
                organization: action.payload
            }

        case CREATE_ORGANIZATION:
            return {
                ...state,
                organization: [
                    ...state.data
                ]
            }

        default:
            return state;
    }
}
export default organizationReducer;