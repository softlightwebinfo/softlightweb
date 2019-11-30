import {actionTypes} from "../actionTypes/user";

export const initialState = {
    user: null,
    token: null,
    error: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USER_LOAD_DATA_SUCCESS:
            return {
                ...state,
                user: action.user,
                token: action.token
            };
        case actionTypes.USER_LOAD_DATA_ERROR:
            return {
                ...state,
                ...{error: action.error}
            };
        case actionTypes.USER_SET_LOGIN: {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
            }
        }
        case actionTypes.USER_SET_LOGOUT: {
            return {
                ...state,
                user: action.data.user,
                token: action.data.token,
            }
        }
        case actionTypes.USER_UPDATE_LOAD_DATA_SUCCESS: {
            return {
                ...state,
                user: action.data
            }
        }
        default:
            return state
    }
}

export default reducer
