import { SIGN_UP, LOGIN, } from "../actions/actionTypes";

const initialState = {
    profile: [],
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const { email, password } = action.payload;
            if (state === undefined) {
                return state
            }
            return {
                ...state,
                profile: [
                    ...state.profile,
                    {
                        email: email,
                        password: password
                    }
                ]
            };

        case SIGN_UP:
            return {
                ...state,
                profile: [
                    ...state.profile
                ]
            }
        default:
            return state;
    }
}

export default authReducer;